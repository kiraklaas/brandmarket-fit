export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] border-t border-[#2A2A2A] px-6 md:px-10 py-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#666]">
        <span>brandmarket.fit</span>
        <span>
          A framework by{" "}
          <a
            href="https://kiraklaas.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#888] underline underline-offset-2 hover:text-[#FAFAF8] transition-colors"
          >
            Kira Klaas
          </a>
        </span>
        <a
          href="https://kiraklaas.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#888] hover:text-[#FAFAF8] transition-colors"
        >
          On Brand ↗
        </a>
      </div>
    </footer>
  );
}
