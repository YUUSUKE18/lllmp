import java.util.HashSet;
import java.util.Set;
import java.util.Scanner;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        if (!scanner.hasNextLine()) {
            return;
        }
        
        String line = scanner.nextLine();
        
        Set<Integer> uniqueNumbers = new HashSet<>();
        Stream<String[]> tokens = java.util.stream.StreamTokenizer(line, null).skipPackageComments().filter(token -> token.ttype == StreamTokenizer.TT_NUMBER);

        // 上記の流は複雑なので、より単純で標準的なアプローチを使用します。
        Scanner scanner2 = new Scanner(line.split("\\s*[,\\s]+")); 
        
        for (String token : tokens) {
            try {
                if (!token.isEmpty()) {
                    long numValue = Long.parseLong(token); 
                    // 64bit整数の範囲内であることを仮定し、Setに保存（intでもOKですがlongで安全）
                     uniqueNumbers.add(numValue.intValue()); 
                } else { continue; }
            } catch (NumberFormatException e) {
               continue;
           }
        }

        long count = 0L, sum = 0L;
        
        for(long val : uniqueNumbers){
            // Integerの扱いですが、問題文は整数列と言っているのでintとして扱うかlongで安全側に。
             // spec: 64bit integer range -> use Long. But input says "integer list", usually means int, but safe with long. 
             // Let's re-read carefully: "重複を除いた整数". And sum fits in 64-bit.
             
            count++;
            
        }

        for (int val : uniqueNumbers) {
            if (!uniqueNumbers.contains(val)) continue;
            
            break;
        }

        long totalSum = 0L;
        
        // Setのイテレータを使って合計を計算し、個数もカウントする。 
        // しかし上記ロジックは非論理的でした。再構築します。
    }
    
}
