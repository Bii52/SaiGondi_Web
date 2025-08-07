import {users } from '@/app/assets/data/user';
import {posts } from '@/app/assets/data/post';
import { notFound } from 'next/navigation';
import { PostTable } from './PostTable'


interface Props {
    params: {
      id: string;
    };
  }


export default async function ProfilePage({params}:Props) {

    const { id } = params;
    const user = users.find((u)=>u.id === 'user_1')
    if (!user) return notFound()

    return <>
    <div className="flex flex-col">
        <div id="banner" className='relative m-8 w-[95%] m mx-auto'>
            <img src={user.cover} alt="" className='w-full h-[500px]  object-cover rounded-3xl ' />
            <span className='absolute top-4 right-4 bg-gray-500 text-xl'>My Data</span>
        </div>
        <div className="grid grid-cols-[30%_70%] w-[92%] mx-auto">        
            <div id='left__container' className='bg-white border border-[#E0E2E7] rounded-sm shadow-[0px_2px_2.67px_0px_#1018281A]'>
                <div id="img__container" className="flex flex-col relative  m-1 rounded-sm">
                    <img src={user.cover} alt="" className='h-40 w-full object-cover' /> 
                    <img src={user.avatar} alt="" className='rounded-full h-20 w-20 absolute left-1/2 -translate-x-1/2 -bottom-10 bg-gray-400 border-4 border-white z-10'/>   
                </div>

                <div className="flex mt-6 justify-center gap-2 items-center">
                        <h2>{user.username}</h2>
                        <span className='block p-1 bg-[#EFEFFD] text-(--primary) px-1 rounded-3xl'>{user.badges}</span>
                </div> 

                <span className="block h-px overflow-hidden bg-gray-400 my-8 origin-top scale-y-20"/>

                <div className="flex gap-4 items-center w-[95%] mx-auto">
                    <i className="ri-mail-line h-8 w-8 flex items-center justify-center text-[#667085] bg-[#E0E2E7] rounded-full text-lg border border-4 border-[#F0F1F3]"></i>
                    <div className='flex-1'>
                        <div className="flex justify-between">
                            <h4 className='text-[#4D5464]'>Email</h4>
                            <button className='bg-[#EFEFFD] text-[#00000033] rounded-3xl px-1'>Chỉnh sửa</button>
                        </div>                        
                        <span>{user.email}</span>
                    </div>                 
                </div>

                <div className="flex gap-4 items-center w-[95%] mx-auto mt-4">
                    <i className="ri-phone-line h-8 w-8 flex items-center justify-center text-[#667085] bg-[#E0E2E7] rounded-full text-lg border border-4 border-[#F0F1F3]"></i>
                    <div className='flex-1'>
                        <div className="flex justify-between">
                            <h4 className='text-[#4D5464]'>Phone</h4>
                            <button className='bg-[#EFEFFD] text-[#00000033] rounded-3xl px-1'>Chỉnh sửa</button>
                        </div>                        
                        <span>{user.phone}</span>
                    </div>                 
                </div>

                <div className="flex justify-center my-2">
                    <button className='btn-primary text-white my-4 px-6 py-2 rounded-2xl'>Khoá tài khoản</button>
                </div>
            </div>    

            <div id="info__container">
                <div id="card__groud" className='grid grid-cols-3 w-full justify-between gap-3 lg:gap-6 p-4 mb-6'>
                    <div className="flex flex-col p-4 bg-white border border-[#E0E2E7] rounded-md shadow-[0px_2px_2.67px_0px_#1018281A] ">
                        <i className="ri-navigation-line rotate-90 h-8 w-8 flex items-center justify-center text-[#0D894F] bg-[#CFE7DC] rounded-full text-lg border border-4 border-[#E7F4EE]"></i>
                        <span className='text-[#667085]'>Điểm đến</span>
                        <span>{user.totalPoints}</span>
                    </div>
                    <div className="flex flex-col p-4 bg-white border border-[#E0E2E7] rounded-md shadow-[0px_2px_2.67px_0px_#1018281A]">
                        <i className="ri-file-text-fill h-8 w-8 flex items-center justify-center text-[#E46A11] bg-[#FAE1CF] rounded-full text-lg border border-4 border-[#FDF1E8]"></i>
                        <span className='text-[#667085]'>Bài viết</span>
                        <span>{user.totalPoints}</span>
                    </div>
                    <div className="flex flex-col p-4 bg-white border border-[#E0E2E7] rounded-md shadow-[0px_2px_2.67px_0px_#1018281A]">
                        <i className="ri-verified-badge-line h-8 w-8 flex items-center justify-center text-(--primary) bg-[#DEDEFA] rounded-full text-lg border border-4 border-[#EFEFFD]"></i>
                        <span className='text-[#667085]'>Bài đánh giá</span>
                        <span>{user.totalPoints}</span>
                    </div>
                </div>

                <div id="post__container" className='m-4 border border-[#E0E2E7] shadow-[0px_2px_2.67px_0px_#1018281A] p-4' >
                    <div className="flex justify-between w-[95%] mx-auto">
                        <h4>Bài đăng gần đây</h4>
                        <div className="flex justify-center items-center px-2 border border-[#E0E2E7] rounded-xl">
                            <i className="ri-sound-module-line"></i>
                        </div>
                    </div>
                    
                    <PostTable data={posts.filter(p => p.username === 'user_1')} />

                </div>

            </div>

           
           
        </div>

    </div>

    
    </>
}