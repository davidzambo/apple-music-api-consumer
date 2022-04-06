import React, {useEffect, useState} from 'react';
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

type Props = {
  onSearch: (term: string) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const SearchBox = ({
                     onSearch,
                     loading,
                     setLoading
                   }: Props) => {
  const [term, setTerm] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    setTerm(event.target.value);
  };

  useEffect(() => {
    let timeout = setTimeout(async () => {
      await onSearch(term);
      setLoading(false);
    }, 500)
    return () => {
      clearTimeout(timeout)
    };
  }, [term]);


  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor="search-term">Search</InputLabel>
      <OutlinedInput
        id="search-term"
        type={'text'}
        value={term}
        onChange={handleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="display loading visibility"
              edge="end"
            >
              {loading && <RotateLeftIcon/>}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  )
}

export {SearchBox}
