function InfoProfileItem({ icon, label, value }: { icon: any; label: string; value?: string }) {
    return (
        <div className="flex flex-col gap-2 p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
                {icon}
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {label}
                </span>
            </div>
            <p className="font-bold text-slate-800 break-all">{value}</p>
        </div>
    );
}

export default InfoProfileItem;
