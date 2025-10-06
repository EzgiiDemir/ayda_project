'use client';

import {Form, Input, Select, message, Button} from 'antd';
import { useTranslations } from 'next-intl';

type Props = { locale: string };

export default function ContactForm({ locale }: Props) {
    const t = useTranslations('contact');

    const labels = {
        name: t('form.name.label', { defaultMessage: 'Ad - Soyad' }),
        email: t('form.email.label', { defaultMessage: 'E-posta' }),
        subject: t('form.subject.label', { defaultMessage: 'Konu' }),
        message: t('form.message.label', { defaultMessage: 'Gönder' }),
        submit: t('form.submit', { defaultMessage: 'Gönder' }),
    };

    const placeholders = {
        name: t('form.name.placeholder', { defaultMessage: 'Lütfen Ad - Soyad giriniz' }),
        email: t('form.email.placeholder', { defaultMessage: 'Lütfen E-posta giriniz' }),
        subject: t('form.subject.placeholder', { defaultMessage: 'Lütfen bir konu seçin' }),
        message: t('form.message.placeholder', { defaultMessage: 'Lütfen Gönder giriniz' }),
    };

    const defaultSubjects = ['Randevu', 'Tedavi Bilgisi', 'Fiyat', 'Diğer'];
    const raw: any = t as any;
    const subjects: string[] =
        typeof raw.raw === 'function'
            ? (raw.raw('form.subject.options', { defaultMessage: defaultSubjects }) as string[])
            : defaultSubjects;

    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try {
            console.log('Contact submit:', { ...values, locale });
            message.success(t('form.success', { defaultMessage: 'Mesajınız gönderildi. Teşekkürler!' }));
            form.resetFields();
        } catch (e) {
            console.error(e);
            message.error(
                t('form.error', { defaultMessage: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.' })
            );
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
                                <p className="text-[14px] leading-5 text-[#474D66]">{labels.name}                                <span className="text-red-500 ml-[2px]">*</span>
                                </p>
                            </label>
                        }
                        rules={[{ required: true, message: placeholders.name }]}
                    >
                        <Input id="name" placeholder={placeholders.name} className="!h-[48px] !rounded-md" />
                    </Form.Item>

                    {/* Email */}
                    <Form.Item
                        className="!flex-1"
                        name="email"
                        label={
                            <label htmlFor="email" className="ant-form-item-required">
                                <p className="text-[14px] leading-5 text-[#474D66]">{labels.email}                                <span className="text-red-500 ml-[2px]">*</span>
                                </p>
                            </label>
                        }
                        rules={[
                            { required: true, message: placeholders.email },
                            { type: 'email', message: t('form.email.invalid', { defaultMessage: 'Geçerli bir e-posta girin' }) },
                        ]}
                    >
                        <Input id="email" placeholder={placeholders.email} className="!h-[48px] !rounded-md" />
                    </Form.Item>
                </div>

                {/* Subject */}
                <Form.Item
                    name="subject"
                    className="w-full"
                    label={
                        <label htmlFor="subject" className="ant-form-item-required">
                            <p className="text-[14px] leading-5 text-[#474D66]">{labels.subject}                            <span className="text-red-500 ml-[2px]">*</span>
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
                            <p className="text-[14px] leading-5 text-[#474D66]">{labels.message}                            <span className="text-red-500 ml-[2px]">*</span>
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
                    className="mx-auto bg-primary-pink px-5 md:px-8 py-2 md:py-4
             rounded-full cursor-pointer lg:hover:bg-ayda-blue
             transition-colors duration-300 ease-in mt-4 md:mt-6
             flex items-center justify-center gap-2"
                >
  <span className="text-sm md:text-base text-white capitalize font-medium">
    {labels.submit}
  </span>
                </button>

            </Form>
        </div>
    );
}
