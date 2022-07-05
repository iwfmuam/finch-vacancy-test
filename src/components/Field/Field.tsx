import { PropsWithChildren } from 'react';
import { FieldStyles } from './FieldStyles';

export const Field = (
  props: PropsWithChildren<{
    title: string;
    maxLength: number;
    requiredLength: number;
    chosenOptions: number[];
    toggleCheckbox: (index: number) => void;
  }>
) => (
  <label css={FieldStyles}>
    {props.title}
    <span>Отметьте {props.requiredLength} чисел.</span>
    <div className="button-group">
      {Array.from({ length: props.maxLength }, (_, i) => (
        <button
          key={i}
          data-is-checked={props.chosenOptions.includes(i)}
          onClick={() => props.toggleCheckbox(i)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  </label>
);
