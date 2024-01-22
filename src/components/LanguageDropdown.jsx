import Select from "react-select";
import {customStyles} from "../constant/customStyles";
import { languageOptions } from "../constant/languageOptions";


const LanguageDropdown = ({ onSelectChange }) => {
  return (
    <>
      <Select
        placeholder={`Plter By Category`}
        options={languageOptions}
        styles={customStyles}
        defaultValue={languageOptions[0]}
        onChange={(selectedOption) => onSelectChange(selectedOption)}
      />
    </>
  );
};

export default LanguageDropdown;
