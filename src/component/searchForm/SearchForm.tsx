import { Button } from "@mui/material";
import styled from "./SearchForm.module.css";

const SearchForm = () => {
  return (
    <div>
      <div className={styled.searchForm}>
        <label className={styled.setImage} htmlFor="setImage">
          <Button variant="outlined">공대 사진 올리기</Button>
        </label>
        <input
          id="setImage"
          accept="image/*"
          className={styled.inputTag}
          type="file"
        />
      </div>
    </div>
  );
};

export default SearchForm;
