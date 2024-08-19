"use client";
import { Input } from "@/shadcn/ui/input";
import { Calendar } from "@/shadcn/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/shadcn/ui/button";
import { cn } from "@/lib/utils";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import "./NewsFilter.css";
import { API_KEY } from "@/utils";

export default function NewsFilter() {
  const [date, setDate] = useState<Date>();
  const [to, setTo] = useState<Date>();

  const handleFilter = () => {
    console.log(date);
    console.log(to);
  };

  const [data, setData] = useState([]);

  async function getNews() {
    try {
      const response = await fetch(`${API_KEY}/get/news`);
      const data = await response.json();
      setData(data);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getNews();
  }, []);
  
  return (
    <section>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <label
            htmlFor=""
            className="text-[#666666] font-semibold text-[18px]"
          >
            Search
          </label>
          <Input className="news__input" type="text" placeholder="Email" />
        </div>
        <div className="flex items-center gap-5">
          <label
            htmlFor=""
            className="text-[#666666] font-semibold text-[18px]"
          >
            From
          </label>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[180px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <label
            htmlFor=""
            className="text-[#666666] font-semibold text-[18px]"
          >
            To
          </label>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[180px] justify-start text-left font-normal",
                    !to && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {to ? format(to, "PPP") : <span>Pick a Date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={to}
                  onSelect={setTo}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <label
            htmlFor=""
            className="text-[#666666] font-semibold text-[18px]"
          >
            Category
          </label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <button
          onClick={handleFilter}
          className="border border-[#666666] text-[#666666] uppercase px-[35px] py-[7px] rounded-full hover:bg-[#666666] hover:text-[#fff] transition-all active:bg-[#414040]"
        >
          search
        </button>
      </div>
    </section>
  );
}
