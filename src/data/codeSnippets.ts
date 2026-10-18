export interface CodeSnippet {
  id: string;
  language: string;
  filename: string;
  extension: string;
  badgeColor: string;
  code: string;
  description: string;
}

export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: 'java',
    language: 'Java',
    filename: 'Main.java',
    extension: 'java',
    badgeColor: 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400',
    description: 'Java 101 standart Scanner sınıfı ve .equals() String karşılaştırma metodu ile yazılmış ödev çözümü.',
    code: `/**
 * Ödev: Kullanıcı Girişi ve Şifre Sıfırlama Algoritması
 * 
 * Soru: Eğer şifre yanlış ise kullanıcıya şifresini sıfırlayıp sıfırlamayacağını sorun,
 * eğer kullanıcı sıfırlamak isterse yeni girdiği şifrenin unuttuğu şifre ile aynı
 * olmaması gerektiğini kontrol edip, şifreler aynı ise ekrana "Şifre oluşturulamadı,
 * lütfen başka şifre giriniz." sorun yoksa "Şifre oluşturuldu" yazan program.
 * 
 * Geliştirici / Hazırlayan: Enes Öztürk
 */

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Kayıtlı (sistemdeki) kullanıcı bilgileri
        String kayitliKullanici = "enes";
        String kayitliSifre = "java123";

        Scanner input = new Scanner(System.in);

        System.out.println("=== KULLANICI GİRİŞ SİSTEMİ (Enes Öztürk) ===");

        // 1. Kullanıcıdan giriş bilgilerini alıyoruz
        System.out.print("Kullanıcı Adınız : ");
        String userName = input.nextLine();

        System.out.print("Şifreniz         : ");
        String password = input.nextLine();

        // 2. Kullanıcı adı ve şifre kontrolü
        if (userName.equals(kayitliKullanici) && password.equals(kayitliSifre)) {
            System.out.println(">> Giriş Başarılı! Hoş geldiniz.");
        } else if (!userName.equals(kayitliKullanici)) {
            System.out.println(">> Kullanıcı adı hatalı! Lütfen kontrol ediniz.");
        } else {
            // Şifre yanlış girildiğinde çalışacak blok
            System.out.println(">> Şifreniz yanlış!");
            System.out.print("Şifrenizi sıfırlamak ister misiniz? (E / H): ");
            String secim = input.nextLine();

            // Kullanıcı sıfırlamak isterse (E veya e)
            if (secim.equalsIgnoreCase("E") || secim.equalsIgnoreCase("Evet")) {
                System.out.print("Yeni şifrenizi giriniz: ");
                String yeniSifre = input.nextLine();

                // Unuttuğu (sistemde kayıtlı olan veya denediği) şifre ile aynı mı kontrolü
                if (yeniSifre.equals(kayitliSifre)) {
                    System.out.println("Şifre oluşturulamadı, lütfen başka şifre giriniz.");
                } else {
                    kayitliSifre = yeniSifre; // Şifre başarıyla güncellendi
                    System.out.println("Şifre oluşturuldu");
                }
            } else {
                System.out.println(">> Şifre sıfırlama işlemi iptal edildi. Giriş sonlandırıldı.");
            }
        }

        input.close();
    }
}`
  },
  {
    id: 'python',
    language: 'Python',
    filename: 'main.py',
    extension: 'py',
    badgeColor: 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400',
    description: 'Python 3 ile yazılmış sade ve temiz konsol çözümü.',
    code: `"""
Ödev: Kullanıcı Girişi ve Şifre Sıfırlama Algoritması
Soru: Şifre yanlışsa sıfırlama sorulup, yeni şifre unuttuğu şifre ile aynıysa
      "Şifre oluşturulamadı, lütfen başka şifre giriniz.", değilse "Şifre oluşturuldu" yazan program.

Hazırlayan: Enes Öztürk
"""

# Sistemde kayıtlı varsayılan bilgiler
kayitli_kullanici = "enes"
kayitli_sifre = "python123"

print("=== KULLANICI GİRİŞ SİSTEMİ (Enes Öztürk) ===")

kullanici_adi = input("Kullanıcı Adınız : ").strip()
girilen_sifre = input("Şifreniz         : ").strip()

# Kullanıcı adı ve şifre kontrolü
if kullanici_adi == kayitli_kullanici and girilen_sifre == kayitli_sifre:
    print(">> Giriş Başarılı! Hoş geldiniz.")
elif kullanici_adi != kayitli_kullanici:
    print(">> Kullanıcı adı bulunamadı!")
else:
    # Şifre yanlış girildi
    print(">> Hatalı şifre girdiniz!")
    secim = input("Şifrenizi sıfırlamak ister misiniz? (E/H): ").strip().upper()

    if secim in ["E", "EVET"]:
        yeni_sifre = input("Yeni şifrenizi giriniz: ").strip()

        # Yeni şifre eski/unuttuğu şifre ile aynı mı?
        if yeni_sifre == kayitli_sifre:
            print("Şifre oluşturulamadı, lütfen başka şifre giriniz.")
        else:
            kayitli_sifre = yeni_sifre
            print("Şifre oluşturuldu")
    else:
        print(">> Şifre sıfırlama iptal edildi.")
`
  },
  {
    id: 'csharp',
    language: 'C#',
    filename: 'Program.cs',
    extension: 'cs',
    badgeColor: 'bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400',
    description: '.NET C# Console uygulaması çözümü.',
    code: `/*
 * Ödev: Şifre Kontrolü ve Sıfırlama Algoritması
 * Hazırlayan: Enes Öztürk
 */

using System;

class Program
{
    static void Main(string[] args)
    {
        string kayitliKullanici = "enes";
        string kayitliSifre = "csharp123";

        Console.WriteLine("=== KULLANICI GİRİŞ SİSTEMİ (Enes Öztürk) ===");

        Console.Write("Kullanıcı Adınız : ");
        string kullaniciAdi = Console.ReadLine();

        Console.Write("Şifreniz         : ");
        string girilenSifre = Console.ReadLine();

        if (kullaniciAdi == kayitliKullanici && girilenSifre == kayitliSifre)
        {
            Console.WriteLine(">> Giriş Başarılı! Hoş geldiniz.");
        }
        else if (kullaniciAdi != kayitliKullanici)
        {
            Console.WriteLine(">> Kullanıcı adı hatalı!");
        }
        else
        {
            Console.WriteLine(">> Hatalı şifre girdiniz!");
            Console.Write("Şifrenizi sıfırlamak ister misiniz? (E/H): ");
            string secim = Console.ReadLine();

            if (secim.Equals("E", StringComparison.OrdinalIgnoreCase) || 
                secim.Equals("Evet", StringComparison.OrdinalIgnoreCase))
            {
                Console.Write("Yeni şifrenizi giriniz: ");
                string yeniSifre = Console.ReadLine();

                if (yeniSifre == kayitliSifre)
                {
                    Console.WriteLine("Şifre oluşturulamadı, lütfen başka şifre giriniz.");
                }
                else
                {
                    kayitliSifre = yeniSifre;
                    Console.WriteLine("Şifre oluşturuldu");
                }
            }
            else
            {
                Console.WriteLine(">> Şifre sıfırlama iptal edildi.");
            }
        }
    }
}`
  },
  {
    id: 'cpp',
    language: 'C++',
    filename: 'main.cpp',
    extension: 'cpp',
    badgeColor: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20 dark:text-cyan-400',
    description: 'Modern C++ (std::string ve std::cin) ile konsol ödev çözümü.',
    code: `/*
 * Ödev: Şifre Sıfırlama Algoritması
 * Hazırlayan: Enes Öztürk
 */

#include <iostream>
#include <string>

using namespace std;

int main() {
    string kayitliKullanici = "enes";
    string kayitliSifre = "cpp123";

    cout << "=== KULLANICI GİRİŞ SİSTEMİ (Enes Öztürk) ===" << endl;

    string kullaniciAdi, girilenSifre;
    cout << "Kullanıcı Adınız : ";
    cin >> kullaniciAdi;

    cout << "Şifreniz         : ";
    cin >> girilenSifre;

    if (kullaniciAdi == kayitliKullanici && girilenSifre == kayitliSifre) {
        cout << ">> Giriş Başarılı! Hoş geldiniz." << endl;
    } else if (kullaniciAdi != kayitliKullanici) {
        cout << ">> Kullanıcı adı hatalı!" << endl;
    } else {
        cout << ">> Hatalı şifre!" << endl;
        cout << "Şifrenizi sıfırlamak ister misiniz? (E/H): ";
        string secim;
        cin >> secim;

        if (secim == "E" || secim == "e" || secim == "Evet" || secim == "evet") {
            cout << "Yeni şifrenizi giriniz: ";
            string yeniSifre;
            cin >> yeniSifre;

            if (yeniSifre == kayitliSifre) {
                cout << "Şifre oluşturulamadı, lütfen başka şifre giriniz." << endl;
            } else {
                kayitliSifre = yeniSifre;
                cout << "Şifre oluşturuldu" << endl;
            }
        } else {
            cout << ">> Şifre sıfırlama işlemi iptal edildi." << endl;
        }
    }

    return 0;
}`
  },
  {
    id: 'c',
    language: 'C',
    filename: 'main.c',
    extension: 'c',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400',
    description: 'Standart C dili (stdio.h ve string.h strcmp fonksiyonu) çözümü.',
    code: `/*
 * Ödev: Şifre Sıfırlama ve Kontrol Algoritması
 * Hazırlayan: Enes Öztürk
 */

#include <stdio.h>
#include <string.h>

int main() {
    char kayitliKullanici[50] = "enes";
    char kayitliSifre[50] = "c123";

    char kullaniciAdi[50];
    char girilenSifre[50];

    printf("=== KULLANICI GİRİŞ SİSTEMİ (Enes Öztürk) ===\\n");

    printf("Kullanıcı Adınız : ");
    scanf("%s", kullaniciAdi);

    printf("Şifreniz         : ");
    scanf("%s", girilenSifre);

    if (strcmp(kullaniciAdi, kayitliKullanici) == 0 && strcmp(girilenSifre, kayitliSifre) == 0) {
        printf(">> Giriş Başarılı! Hoş geldiniz.\\n");
    } else if (strcmp(kullaniciAdi, kayitliKullanici) != 0) {
        printf(">> Kullanıcı adı bulunamadı!\\n");
    } else {
        printf(">> Şifre hatalı!\\n");
        printf("Şifrenizi sıfırlamak ister misiniz? (E/H): ");
        char secim[10];
        scanf("%s", secim);

        if (strcmp(secim, "E") == 0 || strcmp(secim, "e") == 0 || 
            strcmp(secim, "Evet") == 0 || strcmp(secim, "evet") == 0) {
            
            char yeniSifre[50];
            printf("Yeni şifrenizi giriniz: ");
            scanf("%s", yeniSifre);

            if (strcmp(yeniSifre, kayitliSifre) == 0) {
                printf("Şifre oluşturulamadı, lütfen başka şifre giriniz.\\n");
            } else {
                strcpy(kayitliSifre, yeniSifre);
                printf("Şifre oluşturuldu\\n");
            }
        } else {
            printf(">> Sıfırlama işlemi iptal edildi.\\n");
        }
    }

    return 0;
}`
  },
  {
    id: 'javascript',
    language: 'JavaScript / Node',
    filename: 'index.js',
    extension: 'js',
    badgeColor: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:text-yellow-400',
    description: 'Node.js readline arayüzü ile asenkron / konsol çözümü.',
    code: `/**
 * Ödev: Şifre Sıfırlama ve Kontrol Algoritması
 * Hazırlayan: Enes Öztürk
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let kayitliKullanici = 'enes';
let kayitliSifre = 'js123';

console.log('=== KULLANICI GİRİŞ SİSTEMİ (Enes Öztürk) ===');

rl.question('Kullanıcı Adınız : ', (kullaniciAdi) => {
  rl.question('Şifreniz         : ', (girilenSifre) => {
    if (kullaniciAdi === kayitliKullanici && girilenSifre === kayitliSifre) {
      console.log('>> Giriş Başarılı! Hoş geldiniz.');
      rl.close();
    } else if (kullaniciAdi !== kayitliKullanici) {
      console.log('>> Kullanıcı adı bulunamadı!');
      rl.close();
    } else {
      console.log('>> Şifreniz yanlış!');
      rl.question('Şifrenizi sıfırlamak ister misiniz? (E/H): ', (secim) => {
        if (secim.trim().toUpperCase() === 'E' || secim.trim().toLowerCase() === 'evet') {
          rl.question('Yeni şifrenizi giriniz: ', (yeniSifre) => {
            if (yeniSifre === kayitliSifre) {
              console.log('Şifre oluşturulamadı, lütfen başka şifre giriniz.');
            } else {
              kayitliSifre = yeniSifre;
              console.log('Şifre oluşturuldu');
            }
            rl.close();
          });
        } else {
          console.log('>> Şifre sıfırlama işlemi iptal edildi.');
          rl.close();
        }
      });
    }
  });
});
`
  }
];
