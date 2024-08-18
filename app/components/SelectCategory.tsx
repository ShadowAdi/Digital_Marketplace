"use client";
import React, { useState } from "react";
import { caategoryItems } from "../lib/categoryItem";
import { Card, CardHeader } from "@/components/ui/card";

const SelectCategory = () => {
  const [selectCategory, setSelectCategory] = useState<string | null>(null);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <input
        type="hidden"
        name="category"
        value={selectCategory || ""}
      />
      {caategoryItems.map((item,i) => {
        return (
          <div key={i} className="cursor-pointer">
            <Card
              className={
                selectCategory === item.name
                  ? "border-primary border-2"
                  : "border-2 border-primary/10"
              }
              onClick={() => setSelectCategory(item.name)}
            >
              <CardHeader>
                {item.image} <h3 className="font-medium">{item.title}</h3>
              </CardHeader>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default SelectCategory;
