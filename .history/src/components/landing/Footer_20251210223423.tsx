import Image from "next/image";

function Footer() {
  return (
    <footer className="px-6 py-12 border-t bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="شعار DentWise"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-semibold text-lg">DentWise</span>
            </div>
            <p className="text-sm text-muted-foreground">
              مساعدة أسنان ذكية بالذكاء الاصطناعي تساعدك فعلاً.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-3">المنتج</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  كيف يعمل
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  الأسعار
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  الأسئلة الشائعة
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3">الدعم</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  مركز المساعدة
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  تواصل معنا
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  الحالة
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3">قانوني</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  الخصوصية
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  الشروط
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  الأمان
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 DentWise. تم بناؤه للأشخاص الحقيقيين الذين لديهم أسئلة حقيقية عن الأسنان.</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
