import '../assets/spinner.css';

export function LoadingIndicator() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        id="loading-spinner"
        style={{
          width: '50px',
          height: '50px',
        }}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle id="circle" cx="50" cy="50" r="45" style={{ stroke: '#666' }} />
      </svg>
    </div>
  );
}
