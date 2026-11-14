import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import service from '../../appwrite/data'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../css/postform.css'

function Postform({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })
    const nevigate = useNavigate()
    const useData = useSelector(state => state.auth.userData)

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await service.uplodeFile(data.image[0]) : null

            if (file) {
                service.deleteFile(post.image)
            }
            const dbpost = await service.updatePost(post.$id, {
                ...data,
                featuredimage: file ? file.$id : undefined,
            })
            if (dbpost) {
                nevigate(`/post/${dbpost.$id}`)
            }
        } else {
            const file = await service.uplodeFile(data.image[0])

            if (file) {
                const fileid = file.$id
                data.featuredimage = fileid
                const dbpost = await service.createPost({
                    ...data,
                    userid: useData.$id,
                })
                if (dbpost) {
                    nevigate(`/post/${dbpost.$id}`)
                }
            }
        }
    }

    const slugtransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, '_')
                .replace(/\s/g, '_')
        } else return ''
    }, [])

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugtransform(value.title), {
                    shouldValidate: true
                })
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugtransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="postform">
            <div className="postform-main">
                <Input
                    label="Title"
                    placeholder="Enter post title"
                    {...register("title", { required: true })}
                />

                <Input
                    label="Slug"
                    placeholder="post_slug"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugtransform(e.currentTarget.value), {
                            shouldValidate: true
                        })
                    }}
                />

                <RTE
                    label="Content"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>

            <div className="postform-sidebar">
                <Input
                    label="Featured Image"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/webp"
                    {...register("image", { required: !post })}
                />

                {post && post.image && (
                    <div className="postform-preview">
                        <img
                            src={service.getFilePreview(post.image)}
                            alt={post.title}
                            className="postform-preview-img"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    {...register("status", { required: true })}
                />

                <Button
                    bg="#111827"
                    type="submit"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default Postform
