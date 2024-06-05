import Image from "next/image";
import { MainCard } from "./_components/MainCard";

export default function Home() {
    return (
        <>
            <div className="flex items-center justify-center my-10">
                <h1 className="text-3xl font-bold leading-5">Currency Swap Widget</h1>
            </div>
            <div>
                <MainCard />
            </div>
        </>
    );
}
