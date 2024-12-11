import "../../styles/components/loading-spinner.css";

export function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="loading-spinner__ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="loading-spinner__text">Loading...</p>
    </div>
  );
}
