export function Separator({
  marginTop,
  marginBottom,
  marginY,
}: {
  marginTop?: `${number}rem`;
  marginBottom?: `${number}rem`;
  marginY?: `${number}rem`;
}) {
  return (
    <div
      role="separator"
      className="h-[0.0625rem] bg-[#D3DAE7]"
      style={{ marginTop, marginBottom, margin: `${marginY} 0px` }}
    />
  );
}
