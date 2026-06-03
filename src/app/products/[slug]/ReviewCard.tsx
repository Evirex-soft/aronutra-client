import { FaStar } from "react-icons/fa";

interface ReviewCardProps {
    initial: string
    name: string
    title: string
    rating: number
    ratingText: string
    reviewText: string
    helpfulCount: number
    date: string
    gradient: string
    isTopReview?: boolean
}

const ReviewCard = ({
    initial,
    name,
    title,
    rating,
    ratingText,
    reviewText,
    helpfulCount,
    date,
    gradient,
    isTopReview = false,
}: ReviewCardProps) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 relative">
            {isTopReview && (
                <div className="absolute top-4 right-4">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">🥇 Top Review</span>
                </div>
            )}
            <div className="flex items-center gap-3 mb-4">
                <div
                    className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-full flex items-center justify-center text-white font-semibold`}
                >
                    {initial}
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900">{name}</h4>
                    <p className="text-sm text-gray-500">{title}</p>
                </div>
            </div>
            <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`w-4 h-4 ${i < rating ? "text-amber-400" : "text-gray-300"}`} />
                ))}
                <span className="text-sm text-gray-600 ml-2">{ratingText}</span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{reviewText}</p>
            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">💚 Helpful ({helpfulCount})</span>
                <span className="text-xs text-gray-400">{date}</span>
            </div>
        </div>
    )
}

export default ReviewCard;