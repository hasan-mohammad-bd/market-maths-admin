import React, { useState } from "react";
import { Select, Form } from "antd";

const { Option } = Select;

const SearchSelect = ({
  loading,
  handleSearch,
  items,
  label,
  name,
  handleSelection,
  mode,
  rules,
  className,
  disabled,
}) => {
  const [open, setOpen] = useState(undefined);

  const onSearch = (value) => {
    if (!open) {
      setOpen(!open);
    }
    handleSearch(value);
  };

  return (
    <>
      {name ? (
        <Form.Item label={label} name={name} rules={rules}>
          <Select
            showSearch
            mode={mode}
            open={open}
            onSearch={onSearch}
            loading={loading}
            disabled={disabled}
            clearIcon
            placeholder={`Please search to select ${name}`}
            onSelect={(value) => handleSelection && handleSelection(value)}
            onClick={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            filterOption={(input, option) =>
              (option.children || "")
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            className={className}
          >
            {(items || []).map((p) => (
              <Option key={p?.id} value={p?.id}>
                {p?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ) : (
        <Select
          showSearch
          mode={mode}
          clearIcon
          open={open}
          onSearch={onSearch}
          loading={loading}
          disabled={disabled}
          placeholder={`Please select ${name || ""}`}
          onSelect={(value) => handleSelection && handleSelection(value)}
          onClick={() => (items || []).length > 0 && setOpen(true)}
          onBlur={() => setOpen(false)}
          filterOption={(input, option) =>
            (option.children || "")
              .toLowerCase()
              .indexOf((input || "").toLowerCase()) >= 0
          }
          className={className}
        >
          {(items || []).map((p) => (
            <Option key={p?.id} value={p?.id}>
              {p?.name}
            </Option>
          ))}
        </Select>
      )}
    </>
  );
};

export default SearchSelect;
