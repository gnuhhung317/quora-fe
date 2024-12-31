'use client'
import { useEffect, useState } from "react";
import Post from "./Post";
import apiClient from "../../lib/apiClient"
const posts = [
    {
        author: "Đức Hùng",
        avatar: "https://pic.re/image",
        description: "Kinh nghiệm về C, C++, Java · 4 năm",
        question:
            "Lập trình đang rất thịnh hành hiện nay. Bạn nghĩ rằng nếu nhiều người bắt đầu lập trình, liệu nó sẽ không còn sinh lợi nữa?",
        content: `Có, nếu họ bắt đầu sự nghiệp, giỏi lên và duy trì khả năng đó.

Bạn có biết công việc đầu tiên của bạn khó khăn như thế nào không?

Có biết việc tiếp tục học hỏi và phát triển chuyên môn khó khăn ra sao không?

Thực sự rất khó khăn.

Đó là điều vượt xa khả năng của nhiều người.

Mặt khác, phần mềm đang phát triển không ngừng. Mọi thứ đều là phần mềm. Marc Andreesen đã tạo ra thuật ngữ 'phần mềm đang ăn thế giới' và ông ấy đã đúng.

Công việc mơ ước của tôi khi còn nhỏ là trở thành thợ sửa TV. Anh ấy lái xe tải đến nhà chúng tôi. Mở mặt sau của TV và tháo các bóng đèn hỏng (ống chân không) và các điện trở cháy. Anh ấy sẽ ra sau xe để lấy các bộ phận thay thế.

Một công việc thật tuyệt vời!

Bây giờ, tất cả chỉ là mã nguồn. Mỗi phần của nó.

Cũng giống như camera quay TV. Và âm thanh. Quá trình chỉnh sửa. Điều khiển ánh sáng. Đài truyền hình. Phát trực tuyến trên web.

Mọi thứ đều có phần mềm.

Bất cứ thứ gì chưa có phần mềm sẽ bị thay thế.

Không thiếu công việc cho các kỹ sư phần mềm có năng lực.

Đạt được mục tiêu đó lại là một câu chuyện khác.`,
        upvotes: 665,
        comments: 22,
    }, {
        author: "Văn Nam",
        avatar: "https://pic.re/image",
        description: "Nhà khoa học dữ liệu · 5 năm",
        question: "Khoa học dữ liệu vẫn là một nghề tốt vào năm 2024 không?",
        content: `Chắc chắn rồi, nhưng lĩnh vực này đã phát triển rất nhiều.

Các công ty hiện nay tìm kiếm những chuyên gia hiểu cả dữ liệu và nhu cầu kinh doanh.

Cạnh tranh ngày càng khốc liệt, nhưng nhu cầu về những người có kỹ năng vẫn rất cao.

Nếu bạn sẵn sàng chuyên sâu—dù là trong NLP, thị giác máy tính hay dữ liệu lớn—bạn sẽ luôn có cơ hội.

Chìa khóa là tiếp tục học hỏi và thích nghi với các công cụ và nền tảng mới.`,
        upvotes: 432,
        comments: 15,
    },
    {
        author: "Công Vinh",
        avatar: "https://pic.re/image",
        description: "Kỹ sư DevOps cấp cao · 6 năm",
        question: "Tương lai của DevOps trong thế giới điện toán đám mây là gì?",
        content: `DevOps sẽ không biến mất—nó đang phát triển.

Với sự gia tăng của môi trường đa đám mây và lai, vai trò của các kỹ sư DevOps ngày càng trở nên quan trọng hơn.

Tự động hóa, các pipeline CI/CD, và hạ tầng như mã (IaC) hiện nay đã trở thành tiêu chuẩn trong ngành.

Nếu bạn thành thạo Kubernetes, Terraform, và các nền tảng đám mây như AWS hay Azure, bạn sẽ không thiếu cơ hội.

Thế giới hiện nay ưu tiên điện toán đám mây, và DevOps là yếu tố giúp điều đó trở thành hiện thực.`,
        upvotes: 547,
        comments: 29,
    },
    {
        author: "An Khang",
        avatar: "https://pic.re/image",
        description: "Nhà nghiên cứu AI · 3 năm",
        question: "AI có đang thay thế các kỹ sư phần mềm không?",
        content: `AI có thể tự động hóa mã nguồn đến một mức độ nào đó, nhưng nó không thể thay thế sự sáng tạo.

Các kỹ sư phần mềm làm nhiều hơn là chỉ viết mã—họ giải quyết vấn đề, thiết kế hệ thống và xây dựng các sản phẩm tập trung vào người dùng.

Các công cụ AI như Copilot đến để hỗ trợ, không phải thay thế. Chúng giúp tăng năng suất bằng cách xử lý các tác vụ lặp đi lặp lại.

Tóm lại, AI sẽ nâng cao khả năng của các kỹ sư phần mềm, chứ không phải loại bỏ họ.`,
        upvotes: 710,
        comments: 35,
    },
    {
        author: "Ngọc Thanh",
        avatar: "https://pic.re/image",
        description: "Chuyên gia bảo mật mạng · 7 năm",
        question: "Bảo mật mạng quan trọng như thế nào trong thế giới ngày nay?",
        content: `Bảo mật mạng quan trọng hơn bao giờ hết.

Khi các công ty chuyển sang điện toán đám mây và tích hợp các thiết bị IoT, bề mặt tấn công đang ngày càng rộng ra.

Các cuộc tấn công mạng có thể phá hủy doanh nghiệp, rò rỉ dữ liệu nhạy cảm và gây tổn thất không thể phục hồi.

Các chuyên gia bảo mật mạng có kỹ năng, hiểu biết về các mối đe dọa hiện đại—như ransomware, phishing, và các lỗ hổng zero-day—đang có nhu cầu rất cao.

Đây không phải là một sự lựa chọn; mà là một yêu cầu.`,
        upvotes: 615,
        comments: 40,
    },
];
export default function PostList() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // Track if there are more posts to load

    const fetchRecommendations = async () => {
        if (loading || !hasMore) return; // Prevent multiple requests

        setLoading(true);
        try {
            const response = await apiClient.get("/recommendation/answer");
            const formattedPosts = response.data.map((item: any) => ({
                id: item.id,
                author: item.author.fullName,
                avatar: "https://pic.re/image?rand=}" + Math.random(),
                description: `${item.question.author.fullName} · ${item.question.followCount} followers`,
                question: item.question.title,
                content: item.content,
                upvotes: item.interactions.upvotes,
                downvotes: item.interactions.downvotes,
                comments: item.interactions.commentCount,
            }));
            console.log(formattedPosts);
            if (formattedPosts.length === 0) {
                setHasMore(false); // No more posts to load
            } else {
                setPosts(prevPosts => [...prevPosts, ...formattedPosts]); // Append new posts
            }
        } catch (error) {
            console.error("Failed to fetch recommendations:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecommendations(); // Fetch initial posts
    }, []);

    // Infinite scroll handler
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop <= document.documentElement.offsetHeight * 0.7 || loading) return;
        fetchRecommendations(); // Load more posts
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading]);

    return (
        <div className="post-list-container">
            {posts.map((post, index) => (
                <Post
                    key={index}
                    post={{
                        ...post,
                    }}
                />
            ))}
            {loading && <div>Loading more posts...</div>} {/* Loading indicator */}
            {!hasMore && <div>No more posts to load.</div>} {/* No more posts message */}
        </div>
    );
}