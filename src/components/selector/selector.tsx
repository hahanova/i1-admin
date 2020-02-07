import React, { useState } from "react";
import './selector.scss';

const ARROW_LEFT: string = '\u2190';
const ARROW_RIGHT: string = '\u2192';

interface OptionProps {
  name: string,
  id: string,
}

interface OptionsProps {
  options: Array<OptionProps>,
}

interface IdProp {
  id: string,
}

const Selector = (props: any) => {
  const {
    options,
    currentAuthors,
    handleValue,
  }: any = props;

  const currentOptions: any = Object.values(options).filter((author: any) => {
    return currentAuthors.some((name: any) => name === author.name)
  });

  const [state, setState] = useState({
    allOptions: options,
    activeOptions: currentOptions || [],
  });

  const { allOptions, activeOptions } = state;

  const getStateAfterChoosing = (optionText: string, optionId: string) => {
    const { activeOptions } = state;

    if (activeOptions.some(({ id }: IdProp) => id === optionId)) {
      return state;
    }

    return {
      ...state,
      activeOptions: [
        ...activeOptions, {
          name: optionText,
          id: optionId,
        },
      ],
    };
  };

  const chooseOption = ({ target }: React.MouseEvent<HTMLButtonElement>) => {
    const {
      textContent: optionText,
      id: optionId,
    }: any = target;

    const newState = getStateAfterChoosing(optionText, optionId);

    setState(newState);
    handleValue(newState.activeOptions);
  };

  const getStateAfterCancelling = (optionId: string) => {
    const { activeOptions } = state;
    const updatedAllOptions = activeOptions.filter((author: OptionProps) => author.id !== optionId);

    return {
      ...state,
      activeOptions: updatedAllOptions,
    };
  };

  const cancelOption = ({
    target: {
      id: optionId,
    },
  }: any) => {
    const newState = getStateAfterCancelling(optionId);
    setState(newState);
    handleValue(newState.activeOptions);
  };

  const getOption = ({ name, id }: OptionProps, handler: any) => {
    return (
      <li className="selector__item"
        onClick={handler}
        key={`active_${id}`}
        id={id}
      >
        {name}
      </li>
    );
  };

  return (
    <div className="selector">
      <ul className="selector__list">
        {allOptions.map((option: OptionProps) => getOption(option, chooseOption))}
      </ul>
      <div className="selector__arrows">
        <button className="selector__arrow">{ARROW_RIGHT}</button>
        <button className="selector__arrow">{ARROW_LEFT}</button>
      </div>
      <ul className="selector__list">
        {activeOptions.map((option: OptionProps) => getOption(option, cancelOption))}
      </ul>
    </div>
  );
}

export default Selector;
