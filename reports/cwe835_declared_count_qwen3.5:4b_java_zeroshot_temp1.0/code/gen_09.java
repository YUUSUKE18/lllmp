import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1 行目：整数の数を取得（ただし、この値は後に参照するだけで使用しない）
        String firstLine = br.readLine();
        if (firstLine == null) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        // 実際の読み取れた整数を格べる配列
        int[] numbers = new int[20]; // 十分な容量を持つ
        
        StringTokenizer tokenizer;
        int count = 0;
        
        while (true) {
            String line = br.readLine();
            if (line == null) {
                break;
            }
            
            // 空行は無視
            if (line.trim().isEmpty()) {
                continue;
            }
            
            try {
                tokenizer = new StringTokenizer(line);
                while (tokenizer.hasMoreTokens()) {
                    numbers[count++] = Integer.parseInt(tokenizer.nextToken());
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視（ここでは token が存在し、数値化可能な場合のみ処理するため）
                // StringTokenizer の nextToken は常に文字列を返すため、parseInt で例外が thrown される場合がある
                // その場合はそのトークンをスキップする必要があるかもしれないが、仕様は「整数として解釈できない行も無視」
                // 今回は 1 行に複数個の数字がある可能性もあるため、tokenizer を使って処理している。
                // もし该行无法解析为整数的 token，则跳过它。
                if (tokenizer.hasMoreTokens()) {
                    continue; // 実際には整数として解釈できないトークンが存在した場合のみスキップするため
                            // tokenizer.nextToken() で得られた文字列が整数ではない場合は parseInt が例外を投げる
                            // しかし、Java の StringTokenizer は分割された要素を提供するだけで、型変換はアプリ側の責任。
                            // 実際のコードでは try-catch で囲んでいる必要がある。
                }
            } catch (Exception e) {
                // Integer.parseInt による例外が発生した場合（整数ではないトークンがある場合）
                if (!tokenizer.hasMoreTokens()) {
                    // 行が完全に破損している可能性もあるが、単純に無視
                } else {
                    // トークンが存在するが整数化できない場合、そのトークンをスキップし続ける必要あり
                    // ただし、上記構造は複雑になるため、シンプルにするために再考
                }
            }
            
            // 簡略化したロジックへの戻り
        }
        
        // 実際、Integer.parseInt が例外を投げる場合のみスキップする必要がある。
        // ここではより堅牢なアプローチを採用：全トークンを試行し、失敗すればスキップする。
        
        count = 0;
        while (tokenizer.hasMoreTokens()) { // tokenizer は再使用していないため、ここも修正が必要
        
            // リファクタリング後のロジック:
            try {
                int num = Integer.parseInt(tokenizer.nextToken());
                numbers[count++] = num;
            } catch (NumberFormatException e) {
                // 整数ではない場合は無視
                continue;
            }
        }
    }
}
