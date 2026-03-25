import SearchCommand from "@/components/SearchCommand";
import CompanyProfileWidget from "@/components/CompanyProfileWidget";
import { searchStocks } from "@/lib/actions/finnhub.actions";

export default async function SearchPage() {
    // Initial stocks for the search command
    const initialStocks = await searchStocks();

    return (
        <div className="flex flex-col min-h-screen gap-8 p-4 md:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Search Stocks</h1>
                    <p className="text-gray-500 mt-1">
                        Find and track your favorite companies from across the global markets.
                    </p>
                </div>
                <SearchCommand initialStocks={initialStocks} renderAs="button" label="Browse All" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Featured Widget Area */}
                <div className="xl:col-span-1">
                    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                        <h2 className="text-xl font-bold text-white mb-4">Market Leader Profile</h2>
                        <CompanyProfileWidget symbol="NASDAQ:AAPL" />
                    </div>
                </div>

                {/* Information / Sidebar Area */}
                <div className="xl:col-span-2 flex flex-col gap-6">
                    <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                        <h3 className="text-2xl font-bold text-white mb-4">How to Search</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex gap-3">
                                <span className="text-blue-600 font-bold">01.</span>
                                <div>
                                    <p className="text-white font-medium">Use the Search Bar</p>
                                    <p>Find stocks by typing their name or ticker symbol (e.g. 'Apple' or 'AAPL').</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-blue-600 font-bold">02.</span>
                                <div>
                                    <p className="text-white font-medium">Analyze Fundamentals</p>
                                    <p>Click on any result to view full financial details, charts, and news.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-blue-600 font-bold">03.</span>
                                <div>
                                    <p className="text-white font-medium">Add to Watchlist</p>
                                    <p>Keep track of your favorite stocks by adding them to your personal watchlist.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
