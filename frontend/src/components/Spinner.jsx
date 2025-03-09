export default function Spinner() {
  return (
    <div
      id="spinner"
      className="fixed inset-0 bg-deep-black flex items-center justify-center z-[99999] opacity-0 invisible transition-opacity duration-[0.8s] ease-out"
    >
      <div className="w-16 h-16 border-4 border-golden border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}