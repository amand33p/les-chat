import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const FilterBar = ({ filterValue, setFilterValue, placeholder }) => {
  return (
    <div>
      <TextField
        value={filterValue}
        fullWidth
        type="text"
        placeholder={placeholder}
        variant="outlined"
        size="small"
        onChange={(e) => setFilterValue(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default FilterBar;
