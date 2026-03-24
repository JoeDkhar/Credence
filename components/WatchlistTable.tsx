'use client';

import { useRouter } from 'next/navigation';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import WatchlistButton from '@/components/WatchlistButton';
import { getChangeColorClass } from '@/lib/utils';
import { Plus } from 'lucide-react';

interface WatchlistTableProps {
    watchlist: any[];
}

export function WatchlistTable({ watchlist }: WatchlistTableProps) {
    const router = useRouter();

    return (
        <div className="watchlist-table">
            <Table>
                <TableHeader>
                    <TableRow className="table-header-row">
                        <TableHead className="table-header pl-4">Company</TableHead>
                        <TableHead className="table-header">Symbol</TableHead>
                        <TableHead className="table-header">Price</TableHead>
                        <TableHead className="table-header">Change</TableHead>
                        <TableHead className="table-header">Market Cap</TableHead>
                        <TableHead className="table-header">P/E</TableHead>
                        <TableHead className="table-header">Add Alert</TableHead>
                        <TableHead className="table-header text-right pr-4">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {watchlist.map((item) => (
                        <TableRow
                            key={item.symbol}
                            className="table-row"
                            onClick={() => router.push(`/stocks/${encodeURIComponent(item.symbol)}`)}
                        >
                            <TableCell className="table-cell pl-4">{item.company}</TableCell>
                            <TableCell className="table-cell font-mono">{item.symbol}</TableCell>
                            <TableCell className="table-cell font-mono">{item.priceFormatted}</TableCell>
                            <TableCell className={`table-cell font-mono ${getChangeColorClass(item.changePercent)}`}>
                                {item.changeFormatted}
                            </TableCell>
                            <TableCell className="table-cell">{item.marketCap}</TableCell>
                            <TableCell className="table-cell">{item.peRatio}</TableCell>
                            <TableCell className="table-cell">
                                <Button
                                    variant="outline"
                                    className="add-alert"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // Alert logic placeholder
                                    }}
                                >
                                    <Plus className="h-4 w-4 mr-1" />
                                    <span>Add Alert</span>
                                </Button>
                            </TableCell>
                            <TableCell className="table-cell text-right pr-4">
                                <div className="flex justify-end pr-2">
                                    <WatchlistButton
                                        type="icon"
                                        showTrashIcon
                                        symbol={item.symbol}
                                        company={item.company}
                                        isInWatchlist={true}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
