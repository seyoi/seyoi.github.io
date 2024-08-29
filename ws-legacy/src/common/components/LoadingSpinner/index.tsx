import styles from "./index.module.css";

/**
 * size, borderWidth는 "1rem", 1px 같은 형식으로 사용
 * */
export function LoadingSpinner({
  color,
  size,
  borderWidth,
}: {
  color: string;
  size: string;
  borderWidth: string;
}) {
  return (
    <div className={styles["lds-ring"]} style={{ width: size, height: size }}>
      <div
        style={{
          borderColor: `${color} transparent transparent transparent`,
          width: size,
          height: size,
          borderWidth,
        }}
      />
      <div
        style={{
          borderColor: `${color} transparent transparent transparent`,
          width: size,
          height: size,
          borderWidth,
        }}
      />
      <div
        style={{
          borderColor: `${color} transparent transparent transparent`,
          width: size,
          height: size,
          borderWidth,
        }}
      />
      <div
        style={{
          borderColor: `${color} transparent transparent transparent`,
          width: size,
          height: size,
          borderWidth,
        }}
      />
    </div>
  );
}
