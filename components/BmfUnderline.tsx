// Shared component: "BMF" in headings — Instrument Serif + dark underline
export function BmfUnderline({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: '"Instrument Serif", Georgia, serif',
        fontWeight: 400,
        fontStyle: "normal",
        textDecoration: "underline",
        textDecorationColor: "#1A1A1A",
        textDecorationThickness: "3px",
        textUnderlineOffset: "8px",
      }}
    >
      {children}
    </span>
  );
}
