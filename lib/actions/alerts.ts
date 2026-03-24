'use server';

import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import Alert from '@/database/models/Alert';
import { CreateAlertInput, IAlert, AlertStatus } from '@/types/alert';
import { connectToDatabase } from '@/database/mongoose';

/**
 * Creates a new stock price alert for the current user.
 */
export async function createAlert(input: CreateAlertInput): Promise<{ success: boolean; error?: string }> {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session?.user) {
            return { success: false, error: 'Unauthorized' };
        }

        await connectToDatabase();

        await Alert.create({
            ...input,
            userId: session.user.id,
            status: 'active',
        });

        revalidatePath('/watchlist');
        return { success: true };
    } catch (error: any) {
        console.error('createAlert error:', error);
        return { success: false, error: error.message || 'Failed to create alert.' };
    }
}

/**
 * Fetches all non-triggered alerts for the current user.
 */
export async function getUserAlerts(): Promise<IAlert[]> {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session?.user) {
            return [];
        }

        await connectToDatabase();
        const userId = session.user.id;

        // Fetch all alerts where status is NOT 'triggered'
        const alerts = await Alert.find({
            userId,
            status: { $ne: 'triggered' }
        }).sort({ createdAt: -1 }).lean();

        return JSON.parse(JSON.stringify(alerts));
    } catch (error) {
        console.error('getUserAlerts error:', error);
        return [];
    }
}

/**
 * Deletes an alert by ID, verified by current user session.
 */
export async function deleteAlert(alertId: string): Promise<{ success: boolean; error?: string }> {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session?.user) {
            return { success: false, error: 'Unauthorized' };
        }

        await connectToDatabase();
        const userId = session.user.id;

        // Ensure we only delete if it belongs to the user
        const result = await Alert.deleteOne({ _id: alertId, userId });

        if (result.deletedCount === 0) {
            return { success: false, error: 'Alert not found or access denied.' };
        }

        revalidatePath('/watchlist');
        return { success: true };
    } catch (error: any) {
        console.error('deleteAlert error:', error);
        return { success: false, error: error.message || 'Failed to delete alert.' };
    }
}

/**
 * Updates an alert status. Intended for background tasks (e.g., Inngest).
 */
export async function updateAlertStatus(alertId: string, status: AlertStatus): Promise<{ success: boolean }> {
    try {
        await connectToDatabase();
        await Alert.updateOne(
            { _id: alertId },
            { $set: { status, ...(status === 'triggered' ? { triggeredAt: new Date() } : {}) } }
        );

        revalidatePath('/watchlist');
        return { success: true };
    } catch (error) {
        console.error('updateAlertStatus error:', error);
        return { success: false };
    }
}
