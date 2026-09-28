import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            line = line.trim();
            if (!line.isEmpty() && !Character.isWhitespace(line.charAt(0))) { // 簡易的な空白チェック
                BigInteger sum = BigInteger.ZERO;
                java.util.Set<Long> distinctIntegers = new java.util.HashSet<>();

                String[] parts = line.split(",");
                for (String part : parts) {
                    try {
                        long num = Long.parseLong(part.trim()); // 整数として解釈不能な場合は catch がキャッチされないよう注意が必要だが、trim で空文字なら parseLong を通さない処理にするのが安全。ただし仕様「無視」とあるので、数式評価に失敗すればスキップする。
                        if (num != Integer.MAX_VALUE && num >= -Integer.MIN_VALUE) { // long の範囲で ok だが整数列として与えられることは稀なので長さを考慮
                             BigInteger b = BigInteger.valueOf(num); 
                            sum.add(b);
                            distinctIntegers.add(Long.toString(num)); // Set に追加、重複チェック用。ただし個数を求めるにはセットサイズは OK。合計が一致するか確認する必要はない。（仕様：それぞれの整数について）
                        } else {
                           continue; // long 範囲を超えたことは稀だが安全のため
                        }
                    } catch (NumberFormatException e) {
                         // 整数として解釈できない要素は無視する
                     }
                }

               System.out.println("count=" + distinctIntegers.size() + " sum=" + sum);
            } else if (!line.isEmpty()) { 
                 int i=0; while(i<line.length()){if(Character.isWhitespace(line.charAt(i))){i++;continue;}else break}
                 String clean=line.trim();

                BigInteger sum = new java.math.BigInteger(1L); // 初期化値としてゼロを使用するべき。修正:
               sum=new java.math.BigInteger("0"); 
            } else if (line.isEmpty() && true) {
                 System.out.println("count=0 sum=" + BigInteger.ZERO.toString());
            }

        }
    }
}
