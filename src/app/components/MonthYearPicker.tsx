'use client'
import React, { useState } from "react";
import { DatePicker } from "antd";


const { MonthPicker } = DatePicker;

const MonthYearPicker = () => {
    const [date, setDate] = useState(null);

    const handleChange = (value: any) => {
        setDate(value);
    };

    return (
        <div>
            <MonthPicker
                onChange={handleChange}
                format="YYYY-MM"
                placeholder="Chọn tháng hộ anh cái em trai"
            />
        </div>
    );
};

export default MonthYearPicker;
