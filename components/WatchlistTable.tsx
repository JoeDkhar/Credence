'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import WatchlistButton from '@/components/WatchlistButton';
import PriceAlertModal from '@/components/PriceAlertModal';
import { getChangeColorClass } from '@/lib/utils';

interface WatchlistTableProps {
    watchlist: any[];
    initialStocks?: any[]; // kept optional for backwards compat, no longer used here
}

export function WatchlistTable({ watchlist }: WatchlistTableProps) {
    const router = useRouter();
    const [alertTarget, setAlertTarget] = useState<{ symbol: string; companyName: string } | null>(null);

    return (
        <>
            <div className="watchlist-table">
                <Table className="table-fixed w-full">
                    <colgroup>
                        <col className="w-[30%]" />
                        <col className="w-[12%]" />
                        <col className="w-[13%]" />
                        <col className="w-[13%]" />
                        <col className="w-[17%]" />
                        <col className="w-[15%]" />
                    </colgroup>
                    <TableHeader>
                        <TableRow className="table-header-row">
                            <TableHead className="table-header pl-4">Company</TableHead>
                            <TableHead className="table-header">Symbol</TableHead>
                            <TableHead className="table-header">Price</TableHead>
                            <TableHead className="table-header">Change</TableHead>
                            <TableHead className="table-header">Market Cap</TableHead>
                            <TableHead className="table-header">Action</TableHead>
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
                                <TableCell className="table-cell">
                                    <div className="flex items-center gap-2">
                                        <WatchlistButton
                                            type="icon"
                                            showTrashIcon
                                            symbol={item.symbol}
                                            company={item.company}
                                            companyName={item.company}
                                            isInWatchlist={true}
                                            hasAlert={false}
                                            onAddAlert={() => setAlertTarget({
                                                symbol: item.symbol,
                                                companyName: item.company,
                                            })}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <PriceAlertModal
                symbol={alertTarget?.symbol ?? ''}
                companyName={alertTarget?.companyName ?? ''}
                isOpen={alertTarget !== null}
                onClose={() => setAlertTarget(null)}
            />
        </>
    );
}