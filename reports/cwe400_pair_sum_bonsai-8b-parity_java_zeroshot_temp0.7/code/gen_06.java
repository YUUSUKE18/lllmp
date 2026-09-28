import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws java.io.IOException {
        List<Integer> numbers = new ArrayList<>();
        int target = 0;
        boolean lineRead = false;

        for (String line : java.util.Scanner(System.in).lines()) {
            if (!line.isEmpty()) {
                lineRead = true;
                if (line.length() == 1) {
                    target = Integer.parseInt(line);
                } else {
                    String[] parts = line.trim().split("\\s+");
                    for (String part : parts) {
                        if (part.isEmpty()) continue;
                        try {
                            numbers.add(Integer.parseInt(part));
                        } catch (java.util.NumberFormatException e) {
                            continue;
                        }
                    }
                }
            }
        }

        int count = 0;
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
