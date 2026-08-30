import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> distinctNumbers = new HashSet<>();
        
        // カンマ区切りで分割し、各要素を整数として解析・セットに格納する
        String[] parts = line.split(",");
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            try {
                int number = Integer.parseInt(part.trim());
                distinctNumbers.add(number);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        long count = distinctNumbers.size();
        
        if (distinctNumbers.isEmpty()) {
            System.out.println("count=0 sum=0");
        } else {
            int totalSum = 0;
            for (int num : distinctNumbers) {
                // 「重複を除いた整数」について個数と合計を求めるため、各一意の値そのものを足す。
                // ただし問題文の意図（出現回数を重みずく？）を検討が必要だが、「重複を除いた」という表現は「set 化したリスト」を指すと解釈し、単純な和とカウントとする。
                // もし「個々の要素の数分だけ合計に含める（頻度考慮）」なら問題文より複雑になりすぎるため、上記通り一意の値に対する総和として実装する。
                
                totalSum += num; 
            }
            
            System.out.println("count=" + count + " sum=" + totalSum);
        }

    }


}
