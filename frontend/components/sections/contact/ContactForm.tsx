'use client';

import { Form, Input, Select, message } from 'antd';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface ContactFormProps {
    locale: string;
    subjects: string[];
    apiEndpoint?: string;
}

export default function ContactForm({ locale, subjects, apiEndpoint }: ContactFormProps) {
    const t = useTranslations('contact.form');
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const labels = {
        name: t('name.label'),
        email: t('email.label'),
        subject: t('subject.label'),
        message: t('message.label'),
        submit: t('submit'),
    };

    const placeholders = {
        name: t('name.placeholder'),
        email: t('email.placeholder'),
        subject: t('subject.placeholder'),
        message: t('message.placeholder'),
    };

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const endpoint = apiEndpoint || '/api/contact';
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...values, locale }),
            });

            if (!response.ok) throw new Error('Failed to send message');

            message.success(t('success'));
            form.resetFields();
        } catch (error) {
            console.error('Contact form error:', error);
            message.error(t('error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex justify-center px-4 py-8">
            <Form
                form={form}
                layout="vertical"
                className="ant-form ant-form-vertical w-full max-w-3xl flex flex-col items-center"
                onFinish={onFinish}
                requiredMark="optional"
            >
                <div className="flex flex-col md:flex-row md:gap-4 w-full">
                    {/* Name */}
                    <Form.Item
                        className="!flex-1"
                        name="name"
                        label={
                            <label htmlFor="name" className="ant-form-item-required">
                                <p className="text-[14px] leading-5 text-[#474D66]">
                                    {labels.name}
                                    <span className="text-red-500 ml-[2px]">*</span>
                                </p>
                            </label>
                        }
                        rules={[{ required: true, message: placeholders.name }]}
                    >
                        <Input
                            id="name"
                            placeholder={placeholders.name}
                            className="!h-[48px] !rounded-md"
                        />
                    </Form.Item>

                    {/* Email */}
                    <Form.Item
                        className="!flex-1"
                        name="email"
                        label={
                            <label htmlFor="email" className="ant-form-item-required">
                                <p className="text-[14px] leading-5 text-[#474D66]">
                                    {labels.email}
                                    <span className="text-red-500 ml-[2px]">*</span>
                                </p>
                            </label>
                        }
                        rules={[
                            { required: true, message: placeholders.email },
                            { type: 'email', message: t('email.invalid') },
                        ]}
                    >
                        <Input
                            id="email"
                            placeholder={placeholders.email}
                            className="!h-[48px] !rounded-md"
                        />
                    </Form.Item>
                </div>

                {/* Subject */}
                <Form.Item
                    name="subject"
                    className="w-full"
                    label={
                        <label htmlFor="subject" className="ant-form-item-required">
                            <p className="text-[14px] leading-5 text-[#474D66]">
                                {labels.subject}
                                <span className="text-red-500 ml-[2px]">*</span>
                            </p>
                        </label>
                    }
                    rules={[{ required: true, message: placeholders.subject }]}
                >
                    <Select
                        id="subject"
                        placeholder={placeholders.subject}
                        className="!h-[48px] !rounded-md"
                        options={subjects.map((s) => ({ label: s, value: s }))}
                        showSearch
                        filterOption={(input, option) =>
                            (option?.label as string).toLowerCase().includes(input.toLowerCase())
                        }
                    />
                </Form.Item>

                {/* Message */}
                <Form.Item
                    name="message"
                    className="w-full"
                    label={
                        <label htmlFor="message" className="ant-form-item-required">
                            <p className="text-[14px] leading-5 text-[#474D66]">
                                {labels.message}
                                <span className="text-red-500 ml-[2px]">*</span>
                            </p>
                        </label>
                    }
                    rules={[{ required: true, message: placeholders.message }]}
                >
                    <Input.TextArea
                        id="message"
                        placeholder={placeholders.message}
                        className="!rounded-md"
                        style={{ resize: 'none', height: 186, minHeight: 186, maxHeight: 186 }}
                    />
                </Form.Item>

                <button
                    type="submit"
                    disabled={loading}
                    className="mx-auto bg-primary-pink px-5 md:px-8 py-2 md:py-4
            rounded-full cursor-pointer lg:hover:bg-ayda-blue
            transition-colors duration-300 ease-in mt-4 md:mt-6
            flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
          <span className="text-sm md:text-base text-white capitalize font-medium">
            {loading ? t('sending') : labels.submit}
          </span>
                </button>
            </Form>
        </div>
    );
}