import { mergeClasses } from "@/frontend/shared/lib/utils/classNames";
import { TField } from "@/frontend/shared/types/form-field.type";

// utils/renderLabel.js
export const RenderLabel = ({config}: {config:TField}) => {
    if (config.config.input.type === 'radio') {
      return (
        <fieldset className="border-0 p-0 m-0  !max-h-2" id={config.config.name}>
          <legend className="text-md font-medium mb-3 flex items-center gap-2 !border-none">
            {config.config?.label?.icons?.leftIcon}
            <span className={mergeClasses("!flex-1", config.config.label.class)}>
              {config.config.label.value}
            </span>
            {config.config?.label?.icons?.rightIcon}
          </legend>
        </fieldset>
      );
    }
    
    return (
      <div className={mergeClasses("flex gap-2 !w-full items-center pb-3")} >
        {config.config?.label?.icons?.leftIcon}
        <label 
          htmlFor={config.config.name}
          className={mergeClasses("text-md !flex-1", config.config.label.class)}
        >
          {config.config.label.value}
        </label>
        {config.config?.label?.icons?.rightIcon}
      </div>
    );
};
  