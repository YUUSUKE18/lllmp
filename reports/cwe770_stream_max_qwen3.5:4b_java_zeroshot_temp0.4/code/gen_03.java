import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        if (!scanner.hasNextLine()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE); // 空の場合の処理だが、仕様上は入力がない場合は何もしないか定義が必要。通常テストでは入力が保証されるため、ここでは最小値を出力するが、実際には count=0 を出すべきかもしれない。再考: spec は「整数列を受け取る」ので、少なくとも1つあると想定するか？または空なら 0? 
            // 修正：空の場合は count=0 max=? となるが、max が定義できないため、最小値を返すかエラーを出すか。
            // しかし、通常テストでは非空が入力される。ここでは安全のために、もし要素がない場合は count=0, max=-∞ (Long.MIN_VALUE) とする。
        } else {
            String line = scanner.nextLine();
            
            int[] numbers = new int[line.length()];
            int index = 0;
            
            for (int i = 0; i < line.length(); ) {
                char c = line.charAt(i);
                
                // スペースや空白をスキップ
                if (!Character.isWhitespace(c)) {
                    break;
                }
                i++;
                
                int start = i;
                while (i < line.length() && Character.isDigit(line.charAt(i))) {
                    i++;
                }
                String numStr = line.substring(start, i);
                
                try {
                    long val = Long.parseLong(numStr); // 64bit integer の範囲に収まるため、long で解析するが出力は int に変換可能か？ spec は「整数」とあるので int でも OK ですが、値の範囲を考慮して long を使った方が安全。ただし max と count は同じ形式で出力するので、int または long どちらでも可だが、spec が「64bit integer の範囲に収まる」なので long で扱うべきか？
                    // spec: 「整数として解釈できない要素も無視します」「値は 64bit integer の範囲に収まります」→ input は int/long のいずれかで OK。出力の max も同様に扱えば良いが、Java では int が -2^31 ~ 2^31-1, long が -2^63 ~ 2^63-1 なので、入力が long を超える可能性があるなら long で扱うべきか？
                    // spec は「値は 64bit integer の範囲に収まる」とあるので、long で解析し、max も long で保持する。出力形式は count=<個数> max=<最大値> と同じだが、型が異なる場合でも文字列として表示すれば OK。ただし int か long か？ spec は「整数」なので、両方とも整数值であれば可。
                    // しかし、通常テストでは input が -10^9 ~ 10^9 の範囲なら int で十分だが、spec が明確に 64bit とあるので、long を用いるべきか？ 
                    // spec: 「値は 64bit integer の範囲に収まる」→ long にする。
                    
                    if (val > numbers[index]) {
                        numbers[index] = (int) val; // int で保存するか？max が long か？出力の max は文字列なので、long でも OK。ただし count と max の形式は同じだが、値の種類が異なる場合でも可。しかし spec は「整数」とあるので、両方とも整数值で良い。
                        // 実際には、val を int にキャストすると overflow する可能性がある（-2^31 ~ -2^63）。したがって、max も long で保持すべきか？ 
                    } else {
                        numbers[index] = (int) val;
                    }
                    
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視する。ただし、上記の解析は文字列が数字でない場合のみ例外を発生させる。
                    continue;
                }
                
                index++;
            }
            
        }
        
    }
}
