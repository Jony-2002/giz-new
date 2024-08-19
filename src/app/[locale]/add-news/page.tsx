"use client";
import AddBanner from "@/components/AddBanner/AddBanner";
import EnglishNews from "@/components/EnglishNews/EnglishNews";
import Links from "@/components/Links/Links";
import RussianNews from "@/components/RussianNews/RussianNews";
import TajikNews from "@/components/TajikNews/TajikNews";
import { Input } from "@/shadcn/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MediaFiles from "@/components/MediaFiles/MediaFiles";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

import { Calendar } from "@/shadcn/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/shadcn/ui/button";
import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";
import { API_KEY } from "@/utils";

export default function AddNewsPage() {
  const [selectedOption, setSelectedOption] = useState("Event");

  const englishName = useRef<any>(null);
  const englishDescription = useRef<any>(null);

  const tajikName = useRef<any>(null);
  const tajikDescription = useRef<any>(null);

  const russianName = useRef<any>(null);
  const russianDescription = useRef<any>(null);

  const defaultLink = useRef<any>(null);

  const [inputs, setInputs] = useState<any>([]);
  const [date, setDate] = useState<Date | any>(null)

  const handleAddClick = () => {
    const newKey = Date.now();
    setInputs([...inputs, { key: newKey, value: "" }]);
  };

  const handleInputChange = (event: any, key: any) => {
    const newInputs = inputs.map((input: any) =>
      input.key === key ? { ...input, value: event.target.value } : input
    );
    setInputs(newInputs);
  };

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const [files, setFiles] = useState<FileList | null>(null);

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
  };

  const router = useRouter();

  const handleUploadNews = async (event: React.FormEvent) => {
    event.preventDefault();
    const images: any = {};
    const medias: any = [];

    if (file) {
      let banner = await FileREader(file);
      images.banner = banner;

      const formData = new FormData();
      formData.append("file", file);
    }

    if (files && files.length > 0) {
      const promises = Array.from(files).map(async (file, index) => {
        let image = await FileREader(file);
        let imageObject = {
          title: `image_${index}`,
          image_url: image,
        };
        medias.push(imageObject);
      });

      await Promise.all(promises);
    }

    console.log("uploaded");

    const links = inputs.map((input: any) => input.value);
    links.unshift(defaultLink.current.value);

    const data = {
      category: selectedOption,
      english: {
        name: englishName.current.value,
        description: englishDescription.current.value,
      },
      tajik: {
        name: tajikName.current.value,
        description: tajikDescription.current.value,
      },
      russian: {
        name: russianName.current.value,
        description: russianDescription.current.value,
      },
      links: links,
      banner_url: images.banner,
      media_files: medias,
      date,
    };

    console.log(data);

    const response = await fetch(`${API_KEY}/add/news`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    });

    // const jsonData = await response.json();
    // console.log(jsonData);

    if (response.status == 200) {
      router.replace("admin-news");
    } else {
      console.log("error");
    }
  };

  async function FileREader(File: any) {
    console.log("File", File);

    return new Promise((resolve, reject) => {
      let fileData = File;
      let reader = new FileReader();

      reader.onloadend = function () {
        let rawData: any = reader.result;

        let chunkSize = 100536; // Set chunk size
        let offset = 0;
        let bt = "";

        while (offset < rawData.byteLength) {
          let chunk: any = rawData.slice(offset, offset + chunkSize);
          let chunkArray: number[] = Array.from(new Uint8Array(chunk));
          bt += btoa(String.fromCharCode.apply(null, chunkArray));
          offset += chunkSize;
        }

        resolve(bt);
      };

      reader.onerror = function () {
        reject(reader.error);
      };

      reader.readAsArrayBuffer(fileData);
    });
  }

  console.log(date);


  return (
    <main className="bg-[#D3D3D3]">
      <div className="wrapper__page-flow">
        <div className="flex items-center justify-between py-10">
          <h1 className="uppercase text-[26px] font-bold">nEWS DETAILS</h1>
          <div>
            <label
              htmlFor=""
              className="text-[#666666] font-semibold text-[18px] inline-block mb-2"
            >
              Category*
            </label>
            {/* <Input className="w-[450px]" type="text" placeholder="Email" /> */}
            <Select
              value={selectedOption}
              onValueChange={(value) => {
                setSelectedOption(value);
              }}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Describe the news..." />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectGroup>
                  <SelectLabel>Тип новости</SelectLabel>
                  <SelectItem value="Мероприятие">Мероприятие</SelectItem>
                  <SelectItem value="Семинар">Семинар</SelectItem>
                  <SelectItem value="Тренинг">Тренинг</SelectItem>
                  <SelectItem value="Конференция">Конференция</SelectItem>
                  <SelectItem value="Выставка">Выставка</SelectItem>
                  <SelectItem value="Вебинар">Вебинар</SelectItem>
                  <SelectItem value="Мастер-класс">Мастер-класс</SelectItem>
                  <SelectItem value="Форум">Форум</SelectItem>
                  <SelectItem value="Встреча">Встреча</SelectItem>
                  <SelectItem value="Презентация">Презентация</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Навъи хабар</SelectLabel>
                  <SelectItem value="Чорабинӣ">Чорабинӣ</SelectItem>
                  <SelectItem value="Семинар">Семинар</SelectItem>
                  <SelectItem value="Тренинг">Тренинг</SelectItem>
                  <SelectItem value="Конфронс">Конфронс</SelectItem>
                  <SelectItem value="Намоишгоҳ">Намоишгоҳ</SelectItem>
                  <SelectItem value="Вебинар">Вебинар</SelectItem>
                  <SelectItem value="Мастер-класс">Мастер-класс</SelectItem>
                  <SelectItem value="Форум">Форум</SelectItem>
                  <SelectItem value="Вохӯрӣ">Вохӯрӣ</SelectItem>
                  <SelectItem value="Презентатсия">Презентатсия</SelectItem>
                </SelectGroup> */}
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Event">Event</SelectItem>
                  <SelectItem value="Seminar">Seminar</SelectItem>
                  <SelectItem value="Training">Training</SelectItem>
                  <SelectItem value="Conference">Conference</SelectItem>
                  <SelectItem value="Exhibition">Exhibition</SelectItem>
                  <SelectItem value="Webinar">Webinar</SelectItem>
                  <SelectItem value="Master Class">Master Class</SelectItem>
                  <SelectItem value="Forum">Forum</SelectItem>
                  <SelectItem value="Meeting">Meeting</SelectItem>
                  <SelectItem value="Presentation">Presentation</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* <EnglishNews ref={englishName} /> */}
        <section className="mb-[100px]">
          <div className="flex items-center gap-[30px]">
            <div className="w-[100px] h-[10px] bg-[#C30F08]"></div>
            <h1 className="text-[#C30F08] text-[45px] font-semibold">EN</h1>
            <div className="w-[100%] h-[10px] bg-[#C30F08]"></div>
          </div>
          <div className="flex flex-col justify-start items-start gap-[50px]">
            <div>
              <label
                htmlFor=""
                className="text-[#000] font-medium text-[18px] inline-block mb-2"
              >
                Name*
              </label>
              <Input
                className="w-[400px]"
                type="text"
                placeholder="Type the new’s name..."
                ref={englishName}
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="text-[#000] font-medium text-[18px] inline-block mb-2"
              >
                Description*
              </label>
              <Textarea
                placeholder="Type your message here."
                className="w-[600px] h-[200px]"
                ref={englishDescription}
              />
            </div>
          </div>
        </section>
        {/* <TajikNews /> */}
        <section className="mb-[100px]">
          <div className="flex items-center gap-[30px]">
            <div className="w-[100px] h-[10px] bg-[#C30F08]"></div>
            <h1 className="text-[#C30F08] text-[45px] font-semibold">TJ</h1>
            <div className="w-[100%] h-[10px] bg-[#C30F08]"></div>
          </div>
          <div className="flex flex-col justify-start items-start gap-[50px]">
            <div>
              <label
                htmlFor=""
                className="text-[#000] font-medium text-[18px] inline-block mb-2"
              >
                Сарлавҳа*
              </label>
              <Input
                className="w-[400px]"
                type="text"
                placeholder="Type the new’s name..."
                ref={tajikName}
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="text-[#000] font-medium text-[18px] inline-block mb-2"
              >
                Маълумоти бештар*
              </label>
              <Textarea
                placeholder="Type your message here."
                className="w-[600px] h-[200px]"
                ref={tajikDescription}
              />
            </div>
          </div>
        </section>
        {/* <RussianNews /> */}
        <section className="mb-[100px]">
          <div className="flex items-center gap-[30px]">
            <div className="w-[100px] h-[10px] bg-[#C30F08]"></div>
            <h1 className="text-[#C30F08] text-[45px] font-semibold">RU</h1>
            <div className="w-[100%] h-[10px] bg-[#C30F08]"></div>
          </div>
          <div className="flex flex-col justify-start items-start gap-[50px]">
            <div>
              <label
                htmlFor=""
                className="text-[#000] font-medium text-[18px] inline-block mb-2"
              >
                Название*
              </label>
              <Input
                className="w-[400px]"
                type="text"
                placeholder="Type the new’s name..."
                ref={russianName}
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="text-[#000] font-medium text-[18px] inline-block mb-2"
              >
                Описание*
              </label>
              <Textarea
                placeholder="Type your message here."
                className="w-[600px] h-[200px]"
                ref={russianDescription}
              />
            </div>
          </div>
        </section>
        {/* <Links /> */}
        <section className="mb-10">
          <h1 className="text-[24px] font-bold mb-2">Links</h1>
          <div className="flex items-center gap-5 mb-5">
            <Input
              className="w-[500px]"
              type="text"
              placeholder="Введите название новости..."
              ref={defaultLink}
            />
            {/* <button className="bg-[#C30F08] text-white px-5 py-2 rounded-md">
              ADD
            </button> */}
          </div>
          {inputs.map((input: any) => (
            <div key={input.key} className="flex items-center gap-5 mb-5">
              <Input
                className="w-[500px]"
                type="text"
                placeholder="Введите название новости..."
                value={input.value}
                onChange={(e) => handleInputChange(e, input.key)}
              />
              {/* <button className="bg-[#C30F08] text-white px-5 py-2 rounded-md">
                ADD
              </button> */}
            </div>
          ))}
          <div>
            <button
              onClick={handleAddClick}
              className="bg-[#C30F08] text-white h-[50px] w-[50px] flex items-center justify-center rounded-lg text-[20px] mt-5 hover:bg-[#c30e08d8]"
            >
              +
            </button>
          </div>
        </section>
        <div className="flex items-center gap-5 my-10">
          <div>
            {/* <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[180px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, "PPP")
                  ) : (
                    <span>Pick a Date</span>
                  )}
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
            </Popover> */}
            <Input
              className="w-[150px]"
              type="date"
              placeholder="Введите название новости..."
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        {/* <AddBanner /> */}
        <section>
          <p className="text-[20px] font-semibold mb-2">Banner*</p>
          <p className="text-[#737171]">1362x450</p>
          <label
            htmlFor="add-banner"
            className="bg-[#C30F08] text-white px-6 py-3 rounded-md mt-3 inline-block cursor-pointer"
          >
            browse file
          </label>
          <input
            type="file"
            id="add-banner"
            className="opacity-0"
            onChange={handleFileChange}
          />
        </section>
        {/* <MediaFiles /> */}
        <section className="mt-[50px]">
          <h1 className="text-[24px] font-bold mb-2 uppercase">
            media files (png, jpg)
          </h1>
          <p className="text-[#737171]">max size 2 mb</p>
          <label
            htmlFor="media"
            className="bg-[#C30F08] text-white px-6 py-3 rounded-md mt-3 inline-block cursor-pointer"
          >
            Choose photo
          </label>
          <input
            onChange={handleFilesChange}
            type="file"
            id="media"
            className="opacity-0"
            multiple
          />
        </section>
        <div className="flex items-center justify-center">
          <button
            onClick={handleUploadNews}
            className="my-10 bg-[#C30F08] text-white px-6 py-3 rounded-lg active:bg-[#c30e08d4]"
          >
            Upload
          </button>
        </div>
      </div>
    </main>
  );
}
