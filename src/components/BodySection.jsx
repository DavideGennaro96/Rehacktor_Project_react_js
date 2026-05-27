import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";

export default function BodySection() {

    return (
        <section className="grid grid-cols-6 mt-10 px-10">
            <div className="col-span-5 flex flex-col items-center">
                <p className="text-white text-xl mb-5">Reviews</p>
                <textarea className="textarea w-1/2" placeholder="Type your review"></textarea>
            </div>
            <div>
                <FaRegHeart className="text-red-500 cursor-pointer text-3xl" />
            </div>
        </section>
    )
}