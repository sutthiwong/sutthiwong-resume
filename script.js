document.addEventListener('DOMContentLoaded', () => {
    
    // ========================================================
    // ลูกเล่นที่ 1: เอฟเฟกต์พิมพ์ดีดอัตโนมัติ (Typewriter Effect)
    // ตรงชื่อภาษาอังกฤษให้มันค่อยๆ พิมพ์และลบสลับกันได้
    // ========================================================
    const engNameElement = document.querySelector('.eng-name');
    if (engNameElement) {
        const words = ["Sutthiwong Thipmak", "Aspiring Web Developer", "Computer Engineering Student"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                // กำลังลบตัวอักษร
                engNameElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // กำลังพิมพ์ตัวอักษร
                engNameElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            // กำหนดความเร็ว (พิมพ์เร็ว ลบเร็ว)
            let typeSpeed = isDeleting ? 50 : 100;

            // ถ้าพิมพ์จนครบคำแล้ว ให้หยุดแป๊บหนึ่งแล้วค่อยลบ
            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 1500; // หยุดรอ 1.5 วินาที
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length; // สลับไปคำถัดไป
                typeSpeed = 500; // เว้นจังหวะก่อนพิมพ์คำใหม่
            }

            setTimeout(typeEffect, typeSpeed);
        }

        // เริ่มรันเอฟเฟกต์พิมพ์ดีด
        typeEffect();
    }

    // ========================================================
    // ลูกเล่นที่ 2: คลิกที่อีเมลแล้วคัดลอก (Copy to Clipboard) อัตโนมัติ
    // ========================================================
    const emailItem = document.querySelector('.email-text');
    if (emailItem) {
        // เปลี่ยนสไตล์เมาส์ให้เป็นรูปมือเวลาชี้ จะได้รู้ว่ากดได้
        emailItem.style.cursor = 'pointer';
        emailItem.title = 'Click to copy email';

        emailItem.addEventListener('click', () => {
            const emailAddress = emailItem.textContent.trim();
            
            // ใช้คำสั่งบันทึกลง Clipboard
            navigator.clipboard.writeText(emailAddress).then(() => {
                // แจ้งเตือนผู้ใช้สั้นๆ ว่าคัดลอกแล้ว
                const originalText = emailItem.textContent;
                emailItem.textContent = 'Copied! ✅';
                emailItem.style.color = '#a7f3d0'; // เปลี่ยนเป็นสีเขียวอ่อนตอนกดสำเร็จ
                
                // เปลี่ยนกลับเป็นอีเมลเดิมหลังผ่านไป 1.5 วินาที
                setTimeout(() => {
                    emailItem.textContent = originalText;
                    emailItem.style.color = '';
                }, 1500);
            }).catch(err => {
                console.error('Could not copy text: ', err);
            });
        });
    }
});