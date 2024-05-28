import useResponsive from "hooks/useResponsive";
import style from "./index.module.sass";
import Image from "next/image";
import CampaignBtnBlock from "@/components/Home/CampaginBtnBlock";
import CampaignDetailBlock from "@/components/Home/MobileCampaignDetailBlock";
import MobileRankList from "@/components/Home/MobileRankList";
import CampaignInfoBlock from "@/components/Home/CampaignInfoBlock";
import MobileCampaignDetailBlock from "@/components/Home/MobileCampaignDetailBlock";
import DesktopCampaignDetailBlock from "@/components/Home/DesktopCampaignDetailBlock";
import DesktopRankList from "@/components/Home/DesktopRankList";
import API from "@/axios/api";
import { useEffect, useRef, useState } from "react";
import moment from "moment";

export interface ICampaign {
    banner: string;
    label: string;
    isSelected: boolean;
    id: number;
}

export interface ICampaignDetailBlock {
    activity: {
        id: number;
        button_title: string;
        main_title: string;
        sub_title: string;
        close_note: string;
        start_time: string;
        end_time: string;
        banner: string;
        rank_title_1: string;
        rank_title_2: string;
        rank_title_3: string;
        prize_content: string;
        description: string;
        order: number;
        status: number;
        updated_at: string;
        created_at: string;
    };
    rank: {
        order: string;
        name: string;
        value: string;
    }[];
}

const defaultCampaign = {
    activity: {
        id: 0,
        button_title: "",
        main_title: "",
        sub_title: "",
        close_note: "",
        start_time: "",
        end_time: "",
        banner: "",
        rank_title_1: "",
        rank_title_2: "",
        rank_title_3: "",
        prize_content: "",
        description: "",
        order: 0,
        status: 0,
        updated_at: "",
        created_at: "",
    },
    rank: [],
};

const HomePage = () => {
    const ref = useRef();
    const [scrollY, setScrollY] = useState(0);
    const [isCampaignEnded, setIsCampaignEnded] = useState(false);
    const [timer, setTimer] = useState("");
    const [dd, setDD] = useState("");
    const [hh, setHH] = useState("");
    const [mm, setMM] = useState("");
    const [ss, setSS] = useState("");
    const [millisecond, setMillisecond] = useState("");
    const [highlightStage, setHighlightStage] = useState(0); // 0 === no highlight, 1 === yellow highlight, 2 === red highlight
    const { width } = useResponsive();
    const [campaignList, setCampaignList] = useState<ICampaign[]>([]);
    const [selectedCampaignId, setSelectedCampaignId] = useState(0);
    const [selectedCampaign, setSelectedCampaign] =
        useState<ICampaignDetailBlock>(defaultCampaign);

    const getAllCampaigns = async () => {
        const res = await API.getCampaignList();

        const parsed = res.data.return_data.map((item: any, index: number) => {
            let selected = false;

            if (index === 0) {
                selected = true;
            }

            return {
                label: item.button_title,
                banner: item.banner,
                isSelected: selected,
                id: item.id,
            };
        });
        setCampaignList(parsed);
    };

    const getSingleCampaign = async (id: number) => {
        const res = await API.getSingleCampaign(id);

        const activity = res.data.return_data.activity;
        let rank = res.data.return_data.rank;

        if (!activity) {
            setSelectedCampaign(defaultCampaign);
        } else {
            clearInterval(timer);
            console.log(res, "current campaign");
            parseTime(activity);

            if (rank.length === 0) {
                rank = [
                    {
                        order: "",
                        name: "",
                        value: "",
                    },
                    {
                        order: "",
                        name: "",
                        value: "",
                    },
                    {
                        order: "",
                        name: "",
                        value: "",
                    },
                    {
                        order: "",
                        name: "",
                        value: "",
                    },
                    {
                        order: "",
                        name: "",
                        value: "",
                    },
                    {
                        order: "",
                        name: "",
                        value: "",
                    },
                    {
                        order: "",
                        name: "",
                        value: "",
                    },
                    {
                        order: "",
                        name: "",
                        value: "",
                    },
                    {
                        order: "",
                        name: "",
                        value: "",
                    },
                    {
                        order: "",
                        name: "",
                        value: "",
                    },
                ];
            } else {
                rank = rank.sort((a: any, b: any) => a.order - b.order, 0);
            }
            const data = {
                activity: { ...res.data.return_data.activity },
                rank,
            };

            setSelectedCampaign(data);
        }
    };

    const parseTime = (activity: any) => {
        const endTime = moment(activity.end_time).valueOf();
        const current = moment().valueOf();

        if (endTime < current) {
            setIsCampaignEnded(true);
        } else {
            setIsCampaignEnded(false);

            const timer = setInterval(() => {
                let fromNowDay = moment().diff(endTime, "days");
                let fromNowHour = moment().diff(
                    moment(endTime).subtract(Math.abs(fromNowDay), "days"),
                    "hours"
                );
                let fromNowMinute = moment().diff(
                    moment(endTime)
                        .subtract(Math.abs(fromNowDay), "days")
                        .subtract(Math.abs(fromNowHour), "hours"),
                    "minutes"
                );
                let fromNowSecond = moment().diff(
                    moment(endTime)
                        .subtract(Math.abs(fromNowDay), "days")
                        .subtract(Math.abs(fromNowHour), "hours")
                        .subtract(Math.abs(fromNowMinute), "minutes"),
                    "seconds"
                );
                let fromNowMillisecond = moment().diff(
                    moment(endTime)
                        .subtract(Math.abs(fromNowDay), "days")
                        .subtract(Math.abs(fromNowHour), "hours")
                        .subtract(Math.abs(fromNowMinute), "minutes")
                        .subtract(Math.abs(fromNowSecond), "seconds"),
                    "milliseconds"
                );

                let dd =
                    Math.abs(fromNowDay).toString().length === 2
                        ? Math.abs(fromNowDay).toString()
                        : `0${Math.abs(fromNowDay).toString()}`;

                let hh =
                    Math.abs(fromNowHour).toString().length === 2
                        ? Math.abs(fromNowHour).toString()
                        : `0${Math.abs(fromNowHour).toString()}`;

                if (Number(dd) < 3) {
                    setHighlightStage(1);
                }

                if (Number(dd) <= 0) {
                    setHighlightStage(2);
                }

                let mm =
                    Math.abs(fromNowMinute).toString().length === 2
                        ? Math.abs(fromNowMinute).toString()
                        : `0${Math.abs(fromNowMinute).toString()}`;
                let ss =
                    Math.abs(fromNowSecond).toString().length === 2
                        ? Math.abs(fromNowSecond).toString()
                        : `0${Math.abs(fromNowSecond).toString()}`;

                let milliseconds = Math.abs(fromNowMillisecond).toString();
                setDD(dd);
                setHH(hh);
                setMM(mm);
                setSS(ss);
                setMillisecond(milliseconds);
            }, 10);
            // @ts-ignore
            setTimer(timer);
        }
    };

    useEffect(() => {
        getAllCampaigns();
    }, []);

    useEffect(() => {
        const selected = campaignList.find((item) => item.isSelected)!;
        setSelectedCampaignId(selected?.id);
    }, [campaignList]);

    useEffect(() => {
        getSingleCampaign(selectedCampaignId);
    }, [selectedCampaignId]);

    const checkScroll = () => {
        // @ts-ignore
        const childHeight = ref.current && ref.current.scrollTop;
        // @ts-ignore
        setScrollY(childHeight);
    };

    const toTop = () => {
        // @ts-ignore

        ref.current.scrollTop = 0;
    };

    return (
        <div
            className={style.homePage}
            // @ts-ignore
            ref={ref}
            onScroll={() => checkScroll()}
        >
            <div
                className={`${style.bannerBlock}`}
                onClick={() => {
                    if (campaignList.find((item) => item.isSelected)) {
                        setSelectedCampaignId(
                            campaignList.find((item) => item.isSelected)!.id
                        );
                    }
                }}
            >
                {campaignList.find((item) => item.isSelected)?.banner ? (
                    <Image
                        src={
                            campaignList.find((item) => item.isSelected)
                                ?.banner!
                        }
                        alt="banner"
                        fill
                    />
                ) : null}
            </div>
            <div className={style.campaignContentContainer}>
                {/* Bg start */}
                {width >= 1920 ? (
                    <div className={style.desktopBgBlock}>
                        <Image
                            fill
                            src="/icon/desktop_bg.svg"
                            alt="bg"
                            className={style.mobileBg}
                        />
                    </div>
                ) : (
                    <div className={style.mobileBgBlock}>
                        <Image
                            fill
                            src="/icon/mobile_bg.svg"
                            alt="bg"
                            className={style.mobileBg}
                        />
                        <Image
                            fill
                            src="/icon/mobile_bg.svg"
                            alt="bg"
                            className={style.mobileBg}
                        />
                        <Image
                            fill
                            src="/icon/mobile_bg.svg"
                            alt="bg"
                            className={style.mobileBg}
                        />
                        <Image
                            fill
                            src="/icon/mobile_bg.svg"
                            alt="bg"
                            className={style.mobileBg}
                        />
                    </div>
                )}
                {/* Bg end */}

                {campaignList.length > 1 && (
                    <CampaignBtnBlock
                        campaignList={campaignList}
                        setCampaignList={setCampaignList}
                    />
                )}
                {width >= 1920 ? (
                    <DesktopCampaignDetailBlock
                        selectedCampaign={selectedCampaign}
                        dd={dd}
                        hh={hh}
                        mm={mm}
                        ss={ss}
                        highlightStage={highlightStage}
                        milliseconds={millisecond}
                        isCampaignEnded={isCampaignEnded}
                    />
                ) : (
                    <MobileCampaignDetailBlock
                        selectedCampaign={selectedCampaign}
                        dd={dd}
                        hh={hh}
                        mm={mm}
                        ss={ss}
                        highlightStage={highlightStage}
                        milliseconds={millisecond}
                        isCampaignEnded={isCampaignEnded}
                    />
                )}

                {selectedCampaign.rank.length > 0 && (
                    <>
                        {width >= 1920 ? (
                            <DesktopRankList
                                selectedCampaign={selectedCampaign}
                            />
                        ) : (
                            <MobileRankList
                                selectedCampaign={selectedCampaign}
                            />
                        )}
                    </>
                )}

                <CampaignInfoBlock selectedCampaign={selectedCampaign} />
            </div>
            {scrollY > 10 && (
                <div className={style.backToTopIcon} onClick={() => toTop()}>
                    <Image src="/icon/back_to_top.svg" alt="btn" fill />
                    {/* <a href="#top">123</a> */}
                </div>
            )}
        </div>
    );
};

export default HomePage;
