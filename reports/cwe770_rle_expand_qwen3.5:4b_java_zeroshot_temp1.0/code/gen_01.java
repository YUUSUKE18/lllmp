import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long count = 0;
        long sum = 0;

        while (scanner.hasNext()) {
            if (!scanner.hasNextLine()) break;
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;

            String[] parts = line.split(",");
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) continue;
                
                int colonIndex = -1;
                try {
                    int commaIndex = part.lastIndexOf(',');
                    // 値と回数の区切りはカンマ。ただし、値自体の数字が末尾にある可能性も考慮
                    // シンプルに ':' で分割し、その次が ':' または文字列終了を基準にするか、
                    // 問題文の "値:回数" を解釈するため、'>' が使われている可能性を考慮すると、
                    // 今回は "7:3,2:2" の形式なので、',' で分割。
                    // しかし、Java の split(",", "") で文字数を数える必要がある場合があるため、
                    // 厳密なパースを実装します。
                    
                    int comma = -1;
                    int colon = -1;
                    
                    if (part.contains(">")) {
                        // 問題文の "値:回数" は実際には ">" で表されるか確認が必要ですが、
                        // 例が "7:3,2:2" なので ':' で区切るべきです。
                        // しかし、ユーザー入力には ":" が使われている可能性が高いです。
                        // ここでは ", " の場合もあるため、", "を先頭の空白と合わせて処理し、
                        // 実際のデータ形式は "値>回数" または "値:回数" と想定します。
                        // 例文 "7:3,2:2" を見る限り、': 'が区切り文字です。
                        colon = part.lastIndexOf(':');
                    } else {
                        // ':' がいない場合は無視するか、他の形式（>）の場合に備えて、
                        // ', ' で分割し、その後に数字があるか確認
                        comma = part.indexOf(',');
                        if (comma != -1) {
                            int numIndex = colon;
                            if (numIndex == -1) numIndex = part.lastIndexOf(':');
                            
                            long value = 0;
                            long count = 0;
                            try {
                                // 値と回数を文字列から読み取る。
                                // "7:3" の場合は "7", "3" を取ります。
                                // ", " で分割した場合は、その先頭部分を読み取ります。
                                if (colon != -1) {
                                    String[] temp = part.split(":", 2);
                                    if (temp.length >= 2) {
                                        try {
                                            value = Long.parseLong(temp[0]);
                                            count = Long.parseLong(temp[1]);
                                            sum += value * count;
                                            count++;
                                            continue;
                                        } catch (NumberFormatException e) {
                                            // 無効な形式なのでスキップ
                                            continue;
                                        }
                                    }
                                } else if (comma != -1) {
                                    String[] temp = part.split(",", 2);
                                    // ここでは ':' が必要であるため、'>' が含まれるか確認
                                    // 例文 "7:3,2:2" の形式を維持
                                    long v = Long.parseLong(temp[0].trim());
                                    long c = Long.parseLong(temp[1].trim());
                                    if (c >= 0) {
                                        sum += v * c;
                                        count++;
                                        continue;
                                    }
                                }
                            } catch (NumberFormatException e) {
                                // 無効な形式なのでスキップ
                            }
                        }
                    }
                    
                    // 最終的な判定ロジック：
                    // 文字列を分割し、各要素が "値:回数" の形を持っているか確認
                    // 例: "7:3,2:2" -> ["7:3", "2:2"] -> value=7,count=3; value=2,count=2
                    
                    int colonIndex = part.lastIndexOf(':');
                    if (colonIndex != -1) {
                        String valStr = part.substring(0, colonIndex);
                        String cntStr = part.substring(colonIndex + 1).trim();
                        
                        try {
                            long val = Long.parseLong(valStr);
                            long cnt = Long.parseLong(cntStr);
                            if (cnt >= 0) {
                                sum += val * cnt;
                                count++;
                            }
                        } catch (NumberFormatException e) {
                            // 無効な要素は無視
                        }
                    } else {
                        // ':' が含まれていない場合も無視します
                    }
                } catch (Exception e) {
                    // 解析エラーの場合はスキップ
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
