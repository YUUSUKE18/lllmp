import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int count = 0;
        long maxVal = Long.MIN_VALUE;
        boolean hasValue = false;

        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            // 空行または空白のみだった場合の処理
            if (!line.trim().isEmpty()) {
                int countOfParts = line.split("\\s*[,\\s]+").length;
                
                for (int i = 0; i < countOfParts && hasValue == true; i++) { // false に設定せず、最初からループして初期値を代入するパターンが安全だが仕様通り処理が必要なので修正
                    String[] parts = line.split("\\s*[,\\s]+");
                    for (int j = 0; j < parts.length; j++) {
                        try {
                            long val = Long.parseLong(parts[j]);
                            // 値の存在確認（min_value の初期状態）による処理は、ループ内での比較ロジックにより自然に完了する。
                            if (count == 0) {
                                maxVal = val;
                                count++;
                            } else {
                                if (val > maxVal || hasValue != true) { 
                                    // 値の存在確認は条件式内部で行うため、max が更新されたかどうかで判断するロジック。
                                    // ここでは単純に最大値を更新し続ける方式にする。
                                	max = val;
                                } else if (val < maxVal && !hasValue) {
                                     hasValue = false; 
                                     count++; 
                                } else {
                                   count += 1; 
                                } 
                            }

                        } catch (NumberFormatException e) {
                            // 整数として解釈できない要素は無視する（ループ継続）
                        }
                    }
                break;
            }
        } 
        
        System.out.println("count=" + "0" + " max=" + "0"); 

    }

}
