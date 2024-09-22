type ToastType = "error" | "success" | "info" | "warning" | "default";
export const getToastStyle = (type:ToastType): string => {
  const styles = {
    error: "bg-danger border-0 text-xl",
    success: "bg-success border-0 text-xl dark:bg-mixed-1",
    info: "bg-info border-0 text-xl dark:bg-mixed-1",
    warning: "bg-warning border-0 text-xl dark:bg-mixed-1",
    default: "bg-primary-2 border-0 text-xl dark:bg-mixed-1",
  }
  return styles[type];
}