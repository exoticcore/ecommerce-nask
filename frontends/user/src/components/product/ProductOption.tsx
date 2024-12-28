'use client';

import IProduct from '../../interface/product.interface';
import { useAppDispatch, useAppSelector } from '../../hooks';
import React, { useEffect, useState } from 'react';
import {
  clearedOptions,
  selectOptions,
} from '../../redux/features/addToCart/addToCartSlice';

type OptionType = {
  attr: string;
  type?: string | null;
  values: {
    value: string;
    more?: string;
  }[];
}[];

export default function ProductOption({ data }: { data: IProduct }) {
  const optional: OptionType = productOptional(data);
  // const startIndex = data.media?.length ? data.media.length + 1 : 1;

  // const selected: { attr: string; val: string }[] = [];

  const cartState = useAppSelector((state) => state.addToCart);
  const dispatch = useAppDispatch();

  const [select, setSelect] = useState<number[]>([]);
  const [value, setValue] = useState<string[]>([]);

  useEffect(() => {
    if (cartState.cleared) {
      setSelect([]);
      setValue([]);
      dispatch(clearedOptions({ cleared: false }));
    }
  }, [cartState]);

  useEffect(() => {
    if (value.length === optional.length) {
      const selectedSku = data.selection.find((sku) =>
        sku.options.every((attrObj, index) => attrObj.value === value[index])
      );

      if (selectedSku) {
        dispatch(
          selectOptions({
            index: null,
            stock: selectedSku.stock,
            is_stock: selectedSku.is_stock,
            sku: selectedSku.sku,
          })
        );
      }
    }
  }, [value]);

  function productOptional(data: IProduct) {
    const optional: OptionType = [];
    data.selection.map((select) => {
      select.options.map((option) => {
        if (optional.some((opt) => opt.attr === option.attr)) {
          const opt_index = optional.findIndex(
            (opt) => opt.attr === option.attr
          );
          if (
            !optional[opt_index].values.some(
              (val) => val.value === option.value
            )
          ) {
            optional[opt_index].values.push({
              value: option.value,
              more: option.more,
            });
          }
        } else {
          optional.push({
            attr: option.attr,
            type: option.type || null,
            values: [{ value: option.value, more: option.more }],
          });
        }
      });
    });
    return optional;
  }

  function handleSelectOption(s_index: number, index: number, val: string) {
    const newSelect = [...select];
    newSelect[s_index] = index;
    setSelect(newSelect);

    const newValue = [...value];
    newValue[s_index] = val;
    setValue(newValue);
  }

  function findSku() {
    if (value.length === optional.length) {
      const selectedSku = data.selection.find((sku) =>
        sku.options.every((attrObj, index) => attrObj.value === value[index])
      );

      if (selectedSku) {
        dispatch(
          selectOptions({
            index: null,
            stock: selectedSku.stock,
            is_stock: selectedSku.is_stock,
            sku: selectedSku.sku,
          })
        );
      }
    }
  }

  return (
    <div className="product-main-option">
      {optional.map((opt, o_index) => {
        return (
          <div
            className={`${
              opt.type === 'color' ? 'option__color' : 'option__size'
            } ${o_index > 0 && 'pt-7'}`}
            key={o_index}
          >
            <h6>
              {opt.attr}
              {value[o_index] ? <span>: {value[o_index]}</span> : ''}
            </h6>
            <div className="flex gap-3 flex-wrap">
              {opt.values.map((val, index) => {
                if (opt.type === 'color' && val.more) {
                  return (
                    <div
                      className={
                        select[o_index] === index
                          ? `option__color__select active`
                          : `option__color__select`
                      }
                      style={{ backgroundColor: val.more }}
                      key={index}
                      onClick={(e) =>
                        handleSelectOption(o_index, index, val.value)
                      }
                    ></div>
                  );
                } else {
                  return (
                    <div
                      className={
                        select[o_index] === index
                          ? 'option__size__select active'
                          : 'option__size__select'
                      }
                      key={index}
                      onClick={(e) =>
                        handleSelectOption(o_index, index, val.value)
                      }
                    >
                      {val.value}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
