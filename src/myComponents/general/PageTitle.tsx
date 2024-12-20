import { colors } from "@/utils/colors";



export default function PageTitle({title,subTitle}:{title:string,subTitle?:string}){

    return <div className="mb-6">
        <h1 className={`font-bold text-3xl mb-1 text-[${colors.main}]`}>{title}</h1>
        <h2 className="font-medium ">{subTitle}</h2>
    </div>
}