export default function ContentsLayout({
  children,
  modal,
  sheet,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  sheet: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
      {sheet}
    </>
  );
}
