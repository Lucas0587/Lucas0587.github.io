import base64

# 打开图片文件
with open("背景图.jpg", "rb") as image_file:
    # 读取图片内容
    image_data = image_file.read()

# 转换为Base64编码
base64_string = base64.b64encode(image_data).decode('utf-8')

# 输出Base64编码的字符串
print(base64_string)