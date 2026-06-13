'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface FormData {
  name: string;
  email: string;
  phone: string;
  productId: string;
  customization: string;
  notes: string;
}

const products = [
  { id: '1', name: '貓咪項圈吊飾' },
  { id: '2', name: '狗狗蝴蝶結' },
  { id: '3', name: '手工編織項圈' },
  { id: '4', name: '珍珠吊墜項圈' },
];

export function InquiryForm() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('product') || '';
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      productId: productId,
      customization: '',
      notes: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    setSubmitted(true);
    setTimeout(() => {
      form.reset();
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">預購詢問表</CardTitle>
          <CardDescription>
            填寫以下資訊，我們會盡快與您聯繫確認預購詳情。
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {submitted && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">
                ✓ 感謝您的預購詢問！我們會盡快與您聯繫。
              </p>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      姓名 <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="請輸入您的姓名"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>電話</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="0912-345-678"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Product Selection */}
              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      想要的商品 <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        required
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <option value="">-- 請選擇商品 --</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Customization Field */}
              <FormField
                control={form.control}
                name="customization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>客製化需求</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="例如：顏色偏好、尺寸、特殊設計需求等..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Notes Field */}
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>其他備註</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="任何其他想告訴我們的事..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full" size="lg">
                送出預購詢問
              </Button>
            </form>
          </Form>

          {/* Info Box */}
          <div className="p-4 bg-muted rounded-lg border">
            <p className="text-sm text-muted-foreground">
              <strong>📧 提示：</strong> 提交表單後，我們會透過 Email
              與您確認預購詳情和報價。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
