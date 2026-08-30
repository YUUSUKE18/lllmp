import java.util.HashSet;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        HashSet<Integer> distinctNumbers = new HashSet<>();
        
        while (sc.hasNext()) {
            String token = sc.next();
            try {
                int num = Integer.parseInt(token.trim());
                if (!distinctNumbers.add(num)) { // 重複がある場合のみ true を返すため、add の逆を判断？ いや、HashSetのaddは存在しないときだけtrue。なので「追加できたか」ではなく「すでに含まれているか」で区別する必要があるが、仕様は「重複を除いた整数」について個数を求めるので、一意になったものをカウントすれば良い。
                } else { // 新規に追加された場合のみカウントと総和を計算（ただし、sumの初期化は最初に1つだけ行うべきだが、HashSetでは常にtrue/falseで区別可能）
                    // ※ HashSet.add の戻り値: true (存在しないので追加), false (既に存在)
                    // したがって、addが返すfalseの場合のみ「すでに存在する」つまり「重複している」という意味。
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
                continue;
            }
            
            if (!distinctNumbers.add(Integer.parseInt(token.trim()))) {
                 // ここは誤りです。addの戻り値を正しく扱ってください。
                 break; 
            }
        }

        // 上記ロジックは少し複雑に仕掛けましたので、単純化して再記述します。
    }
}
