
// import classnames from "../utils/General";
const CustomInput = ({ customInput, setCustomInput }) => {
    return (
      <>
        <textarea className="w-full h-56 rounded-md font-normal text-sm overflow-y-auto border p-2"
          rows={`5`}
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Custom Input"
        
        ></textarea>
      </>
    );
  };
  
  export default CustomInput;
  