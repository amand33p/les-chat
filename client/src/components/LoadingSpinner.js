import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingSpinner = ({ size, marginTop }) => {
  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: marginTop || '3em',
      }}
    >
      <CircularProgress disableShrink size={size || 60} />
    </div>
  );
};

export default LoadingSpinner;
