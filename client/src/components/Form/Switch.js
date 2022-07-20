import styled from "styled-components";

const SwitchContainer = styled.div`
  display: flex;
  justify-content: start;

  .my-label {
    line-height: 1.5;
  }
  .input-container {
    margin-left: 10px;
    input {
      display: none;
    }
    .react-switch-label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      width: 50px;
      height: 24px;
      background: grey;
      border-radius: 100px;
      position: relative;
      transition: background-color 0.2s;
    }

    .react-switch-label .react-switch-button {
      content: "";
      position: absolute;
      top: 2px;
      left: 2px;
      width: 20px;
      height: 20px;
      border-radius: 45px;
      transition: 0.2s;
      background: #fff;
      box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
    }

    .react-switch-checkbox:checked + label.react-switch-label {
      background-color: ${(props) => props.color || props.theme.color.primaryColor};
    }

    .react-switch-checkbox:checked + .react-switch-label .react-switch-button {
      left: calc(100% - 2px);
      transform: translateX(-100%);
    }
  }
`;

const Switch = ({ name, onChange, defaultChecked, label, color }) => {
  return (
    <SwitchContainer color={color}>
      <div className="my-label">{label}</div>
      <div className="input-container">
        <input
          className="react-switch-checkbox"
          id={`react-switch-new`}
          type="checkbox"
          name={name}
          onChange={onChange}
          defaultChecked={defaultChecked}
        />
        <label className="react-switch-label" htmlFor={`react-switch-new`}>
          <span className={`react-switch-button`} />
        </label>
      </div>
    </SwitchContainer>
  );
};

export default Switch;
