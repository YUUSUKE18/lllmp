import java.util.Scanner;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNext()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE); // 空の場合は定義上最大値が最小値 (または undefined をどうするか、ここでは MIN_VALUE で無効な状態を返す)
            return;
        }

        String input = scanner.nextLine();
        
        if (!input.trim().isEmpty()) {
            String[] parts = input.split(",");
            
            long count = 0;
            Long maxVal = null; // Integer.MIN_VALUE より小さく、null で初期化
            
            for (String part : parts) {
                try {
                    int trimmedPart = part.trim().length() > 0 ? Integer.parseInt(part.trim()) : 0; 
                    
                    if (trimmedPart == 0 && !part.matches("\\s*")) continue; // "0" は要素としてカウントされるが、空白のみはスキップ
                    
                    long val = Long.parseLong(trimmedPart);
                    count++;
                    maxVal = maxVal != null ? Math.max(maxVal, val) : val;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視
                }
            }

            if (count == 0 && !input.isEmpty()) {
                 System.out.println("count=0 max=" + Long.MIN_VALUE);
            } else {
               System.out.println("count=" + count + " max=" + (maxVal != null ? maxVal : Integer.MIN_VALUE)); // min_val を返すのは、空でない入力に対して要素がない場合のデフォルト値とする。ただし spec は「整数として解釈できない要素も無視」なので、全てが非数なら count=0 になるべきだが max の初期値は不明確。通常実装では MIN_VALUE や MAX_VALUE が使われることが多いが、ここでは空でない入力に対して最小限の値を選ぶため Integer.MIN_VALUE を用いる。
            }

        } else { // 空白のみが入力された場合
             System.out.println("count=0 max=" + Long.MIN_VALUE);
        }
    }
}
